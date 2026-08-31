// The familiar square-with-a-dot veg/non-veg marker: green for veg,
// red for non-veg.
const VegIndicator = ({ isVeg }) => {
    const color = isVeg ? "#079E07" : "#B0342D";
    return (
        <span
            role="img"
            aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
            title={isVeg ? "Veg" : "Non-veg"}
            className="inline-flex items-center justify-center w-4 h-4 border shrink-0"
            style={{ borderColor: color }}
        >
            <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
            ></span>
        </span>
    );
};

export default VegIndicator;
