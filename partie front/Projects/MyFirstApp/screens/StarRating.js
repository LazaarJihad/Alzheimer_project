import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const StarRating = ({ rating, count, onChange }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  useEffect(() => {
    // Met à jour l'évaluation sélectionnée chaque fois que les props changent
    setSelectedRating(rating);
  }, [rating]);

  const handleRating = (selected) => {
    setSelectedRating(selected);
    onChange(selected);
  };

  const renderStars = () => {
    const stars = [];
    const maxRating = 5;

    for (let i = 1; i <= maxRating; i++) {
      const isFilled = count > 0 && i <= selectedRating;
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRating(i)}>
          <Image
            source={isFilled ? require("./Image/filledStar.png") : require("./Image/emptyStar.png")}
            style={{ width: 15, height: 15, marginRight: 2 }}
          />
        </TouchableOpacity>
      );
    }

    return stars;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {renderStars()}
      <Text style={{ marginLeft: 5, marginRight: 10 }}>{`(${count})`}</Text>
    </View>
  );
};

export default StarRating;
