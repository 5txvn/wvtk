# Word Vector Toolkit (WVTK)

A modern, interactive web application for exploring word vectors and semantic relationships using advanced AI techniques.

## 🚀 Features

### Core Tools
- **Similar Words Finder**: Discover semantically similar words using cosine similarity
- **Word Analogies Solver**: Solve word analogies using vector arithmetic (e.g., king - man + woman = queen)
- **Vector Explorer**: Visualize and analyze word vectors in high-dimensional space
- **Word Clustering**: Automatically group similar words into semantic clusters

### Modern UI/UX
- ✨ Beautiful, responsive design with Tailwind CSS
- 🎨 Interactive visualizations and charts
- 📱 Mobile-friendly interface
- ⚡ Fast, real-time results
- 🎯 Intuitive user experience

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript with jQuery
- **Styling**: Tailwind CSS (CDN)
- **Icons**: FontAwesome 6
- **Charts**: Chart.js for data visualization
- **Data**: NumPy for vector operations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wvtk.git
   cd wvtk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Similar Words Tool
- Enter any word to find semantically similar words
- Adjust the number of results (5-20)
- Export results to CSV
- Try example words like "king", "computer", "happy", "science"

### Word Analogies Tool
- Input three words to solve analogies
- Format: Word1 - Word2 + Word3 = Result
- Examples:
  - king - man + woman = queen
  - paris - france + germany = berlin
  - father - man + woman = mother

### Vector Explorer Tool
- Compare two words visually
- Analyze vector properties and relationships
- View similarity scores and distributions
- Interactive charts and visualizations

### Word Clustering Tool
- Add multiple words to group them
- Choose number of clusters (2-6)
- Use pre-defined word sets (emotions, animals, colors, etc.)
- Export clustering results

## 🔧 API Endpoints

### GET `/api/similar-words`
Find words similar to a given word.
```
GET /api/similar-words?word=king&n=10
```

### POST `/api/word-analogies`
Solve word analogies using vector arithmetic.
```json
POST /api/word-analogies
{
  "word1": "king",
  "word2": "man", 
  "word3": "woman",
  "n": 10
}
```

### GET `/api/vector-stats`
Get statistics about the vector dataset.
```
GET /api/vector-stats
```

### POST `/api/cluster-words`
Cluster words into semantic groups.
```json
POST /api/cluster-words
{
  "words": ["happy", "sad", "angry", "excited"],
  "n_clusters": 3
}
```

## 📊 Data Format

The application uses:
- **vectors.npy**: NumPy array containing word vectors (high-dimensional)
- **vocabulary.json**: Array of words corresponding to the vectors

## 🎨 Customization

### Adding New Tools
1. Create a new HTML file in the `public/` directory
2. Add a route in `server.js`
3. Implement the corresponding API endpoint
4. Update the homepage with a new tool card

### Styling
- Modify Tailwind classes in HTML files
- Add custom CSS in `<style>` tags
- Update color schemes and themes

### Data
- Replace `vectors.npy` and `vocabulary.json` with your own data
- Ensure vocabulary and vectors are properly aligned
- Adjust vector dimensions in the code if needed

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
- `PORT`: Server port (default: 3000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built for AI/NLP coursework
- Uses advanced vector mathematics for semantic analysis
- Inspired by modern word embedding techniques

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the documentation
- Review the API endpoints

---

**Word Vector Toolkit** - Exploring the semantic space of words through AI-powered analysis.

