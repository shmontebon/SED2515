const bookTitle = document.getElementById("bookTitle");
const rating = document.getElementById("rating");
const reviewText = document.getElementById("reviewText");
const submitBtn = document.getElementById("submitBtn");
const reviewsContainer = document.getElementById("reviewsContainer");
const charCount = document.getElementById("charCount");

let reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];

// Character Counter
reviewText.addEventListener("input", () => {
charCount.textContent = reviewText.value.length;
});

// Save Reviews
function saveReviews() {
localStorage.setItem("bookReviews", JSON.stringify(reviews));
}

// Display Reviews
function displayReviews() {
reviewsContainer.innerHTML = "";

reviews.slice().reverse().forEach((review, index) => {
const card = document.createElement("div");
card.classList.add("review-card");

card.innerHTML = `
<h3>${review.title}</h3>
<p><strong>Rating:</strong> ${"⭐".repeat(review.rating)}</p>
<p>${review.text}</p>
<button class="delete-btn" onclick="deleteReview(${reviews.length - 1 - index})">
Delete
</button>
`;

reviewsContainer.appendChild(card);
});
}

// Delete Review
function deleteReview(index) {
reviews.splice(index, 1);
saveReviews();
displayReviews();
}

window.deleteReview = deleteReview;

// Add Review
submitBtn.addEventListener("click", () => {
const title = bookTitle.value.trim();
const rate = rating.value;
const text = reviewText.value.trim();

if (!title || !rate || !text) {
alert("Please fill in all fields.");
return;
}

reviews.push({
title,
rating: Number(rate),
text
});

saveReviews();
displayReviews();

bookTitle.value = "";
rating.value = "";
reviewText.value = "";
charCount.textContent = "0";
});

displayReviews();