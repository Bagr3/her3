# Anniversary Quiz Project

This project is a fun and interactive quiz designed to celebrate the 7-month anniversary of a relationship. The quiz features visually appealing elements and a carousel of images to enhance the experience.

## Project Structure

```
anniversary-quiz
├── index.html          # Main HTML file for the application
├── css
│   ├── styles.css      # Custom styles for the application
│   └── tailwind.css    # Compiled Tailwind CSS
├── js
│   ├── main.js         # Main JavaScript file for initialization and interactions
│   ├── quiz.js         # Logic for the quiz functionality
│   └── carousel.js      # Carousel functionality for image display
├── img
│   ├── a_0.jpg        # Images for the carousel (a_0.jpg to a_30.jpg)
│   ├── a_1.jpg
│   ├── ...
│   └── a_30.jpg
├── assets
│   ├── backgrounds     # Directory for background images
│   ├── animations      # Directory for animations
│   └── effects         # Directory for visual effects
├── package.json        # npm configuration file
├── tailwind.config.js  # Tailwind CSS configuration file
└── README.md           # Project documentation
```

## Features

- **Interactive Quiz**: A quiz that presents questions with multiple-choice answers. The correct answer is highlighted, and incorrect answers are removed with a visual effect.
- **Celebratory Message**: At the end of the quiz, a special message appears to celebrate the anniversary.
- **Image Carousel**: A carousel that displays images related to the relationship, which can be manually controlled or set to auto-scroll.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd anniversary-quiz
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Open `index.html` in a web browser to view the application.

## Customization

- **Quiz Questions**: Modify the quiz questions and answers in the `quiz.js` file. You can set the title, messages, and correct answers as needed.
- **Images**: Add or replace images in the `img` directory. Ensure they are named from `a_0.jpg` to `a_30.jpg` for the carousel to function correctly.
- **Styles**: Customize the appearance by editing `styles.css` or using Tailwind CSS utility classes in `index.html`.

Enjoy celebrating your special moments with this interactive quiz!