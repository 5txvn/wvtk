import numpy as np
import json
import re
from sklearn.metrics.pairwise import cosine_similarity

# ---------------------
# Load vocabulary + vectors
# ---------------------
with open("../app/data/vocabulary.json", "r") as f:
    vocabulary = json.load(f)

word_to_index = {word: idx for idx, word in enumerate(vocabulary)}
vectors = np.load("../app/data/vectors.npy")  # shape: [vocab_size, embedding_dim]

# ---------------------
# Text preprocessing
# ---------------------
def clean_and_tokenize(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", "", text)
    return text.split()

# ---------------------
# Convert text to vector
# ---------------------
def text_to_vector(text):
    tokens = clean_and_tokenize(text)
    valid_vectors = []

    for token in tokens:
        if token in word_to_index:
            idx = word_to_index[token]
            valid_vectors.append(vectors[idx])

    if not valid_vectors:
        return np.zeros(vectors.shape[1])  # zero vector if nothing matches

    return np.mean(valid_vectors, axis=0)  # average of all word vectors

# ---------------------
# Compute semantic score
# ---------------------
def score_answer(model_answer, student_answer):
    vec1 = text_to_vector(model_answer)
    vec2 = text_to_vector(student_answer)

    similarity = cosine_similarity([vec1], [vec2])[0][0]
    similarity = max(0.0, min(similarity, 1.0))  # clip to [0, 1]

    # Scale similarity to a score out of 100
    score = round(similarity * 100, 2)
    return score

# ---------------------
# Example usage
# ---------------------
if __name__ == "__main__":
    model_answer = "Photosynthesis is the process by which green plants make their food using sunlight, water, and carbon dioxide."
    student_answer = "Green plants use sunlight and carbon dioxide to make food. This is photosynthesis."
    other_answer = "Cars are vehicles that run on gasoline or diesel fuel. They are powered by an engine."

    score = score_answer(model_answer, student_answer)
    other_score = score_answer(model_answer, other_answer)
    print(f"Similarity Score: {score}/100")
    print(f"Other Score: {other_score}/100")
