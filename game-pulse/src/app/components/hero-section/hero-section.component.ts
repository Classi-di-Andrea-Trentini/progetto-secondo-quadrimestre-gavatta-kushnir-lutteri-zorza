import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  standalone: true
})
export class HeroSectionComponent {
  slides = [
    {
      id: 1,
      backgroundImage: '/herosection1.jpg',
      title: {
        first: 'Game',
        second: 'Pulse'
      },
      subtitle: 'Your Ultimate Gaming Destination',
      description: 'Discover the best games, reviews, and industry news in one place. Stay updated with the latest gaming news, trends, and exclusive content. Get in-depth reviews, upcoming releases, and connect with a community of passionate gamers like you.',
      buttons: [
        { text: 'Latest News', url: '/home', type: 'primary' },
        { text: 'Trending Games', url: '/category', type: 'secondary' }
      ]
    },
    {
      id: 2,
      backgroundImage: '/herosection2.jpg',
      title: {
        first: 'Gaming',
        second: 'Reviews'
      },
      subtitle: 'Expert Opinions on Latest Releases',
      description: 'Detailed analysis and professional reviews of the newest games. Our expert team tests and rates every aspect to help you make informed gaming choices. Find out what\'s worth playing and what you might want to skip.',
      buttons: [
        { text: 'Account', url: '/user', type: 'primary' },
        { text: 'Community work in progress', url: '/community', type: 'secondary' }
      ]
    },
    {
      id: 3,
      backgroundImage: '/herosection3.jpg',
      title: {
        first: 'Gaming',
        second: 'Community'
      },
      subtitle: 'Connect With Fellow Gamers',
      description: 'Join our thriving community of passionate gamers. Share your experiences, find teammates, participate in discussions, and stay connected with like-minded players. Gaming is better together!',
      buttons: [
        { text: 'Join Now work in progress', url: '/community', type: 'primary' },
        { text: 'Gaming Forums work in progress', url: '/forums', type: 'secondary' }
      ]
    }
  ];

  activeSlide = 0;
}
