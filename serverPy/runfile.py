from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from uuid import uuid4

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
UPLOAD_FOLDER = 'uploads_temp'  # Cartella temporanea per i chunk
FINAL_UPLOAD_FOLDER = 'download' # Cartella dove salvare il file completo

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['FINAL_UPLOAD_FOLDER'] = FINAL_UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 100*1024 * 1024  # Limite per ogni chunk (2MB)

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(FINAL_UPLOAD_FOLDER):
    os.makedirs(FINAL_UPLOAD_FOLDER)

@app.route('/upload_chunk', methods=['POST'])
def upload_chunk():
    chunk = request.files.get('chunk')
    chunk_number = int(request.form.get('chunkNumber'))
    total_chunks = int(request.form.get('totalChunks'))
    filename = request.form.get('uploadId')
    print(request.form.get('uploadId'))
    upload_id = request.form.get('uploadId')

    if not chunk:
        return jsonify({'error': 'Nessun chunk ricevuto'}), 400

    temp_filename = os.path.join(app.config['UPLOAD_FOLDER'], f'{upload_id}_{filename}.part_{chunk_number}')
    try:
        chunk.save(temp_filename)
    except Exception as e:
        return jsonify({'error': f'Errore durante il salvataggio del chunk: {str(e)}'}), 500

    # Verifica se tutti i chunk sono stati caricati
    uploaded_chunks = [f for f in os.listdir(app.config['UPLOAD_FOLDER']) if f.startswith(f'{upload_id}_{filename}.part_')]
    if len(uploaded_chunks) == total_chunks:
        # Riordina e unisci i chunk
        final_filepath = os.path.join(app.config['FINAL_UPLOAD_FOLDER'], filename)
        with open(final_filepath, 'wb') as outfile:
            for i in range(1, total_chunks + 1):
                chunk_path = os.path.join(app.config['UPLOAD_FOLDER'], f'{upload_id}_{filename}.part_{i}')
                with open(chunk_path, 'rb') as infile:
                    outfile.write(infile.read())
                os.remove(chunk_path)  # Pulisci i chunk temporanei

        return jsonify({'message': f'File caricato con successo come {filename}'}), 201

    return jsonify({'message': f'Chunk {chunk_number} caricato', 'uploadId': upload_id}), 200

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    filepath = os.path.join(app.config['FINAL_UPLOAD_FOLDER'], filename + ".zip") 
    if os.path.exists(filepath) and os.path.isfile(filepath):
        try:
            return send_from_directory(app.config['FINAL_UPLOAD_FOLDER'], filename + ".zip", as_attachment=True)
        except Exception as e:
            return jsonify({'error': f'Errore durante l\'invio del file: {str(e)}'}), 500
    else:
        return jsonify({'error': f'File non trovato: {filename}'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4200)