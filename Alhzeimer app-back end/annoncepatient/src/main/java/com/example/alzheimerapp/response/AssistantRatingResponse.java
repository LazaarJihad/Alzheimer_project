package com.example.alzheimerapp.response;

public class AssistantRatingResponse {
    private double rating;
    private int ratingCount;
    private double ratingPercentage;
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public int getRatingCount() {
		return ratingCount;
	}
	public void setRatingCount(int ratingCount) {
		this.ratingCount = ratingCount;
	}
	public double getRatingPercentage() {
		return ratingPercentage;
	}
	public void setRatingPercentage(double ratingPercentage) {
		this.ratingPercentage = ratingPercentage;
	}
	public AssistantRatingResponse(double rating, int ratingCount, double ratingPercentage) {
		super();
		this.rating = rating;
		this.ratingCount = ratingCount;
		this.ratingPercentage = ratingPercentage;
	}


}
