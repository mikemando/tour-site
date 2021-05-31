const fs = require("fs");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json({ extended: true }));

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours,
        },
    });
});

app.post("/api/v1/tours", (req, res) => {
    const tourID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: tourID }, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: newTour,
                },
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
