const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json())

courses = [
    {id: 1, name:'course1'},
    {id: 2, name:'course2'},
    {id: 3, name:'course3'},
    {id: 4, name:'course4'},
    {id: 5, name:'course5'},
    {id: 6, name:'course6'},
]

app.post('/api/courses/', (req, res)=>{
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);

    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    // Check if the course exist or not
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    
    // If it doesn't, then append the course or else throw error that it already exists
    courses.push(course);
    // Send a message that it is appended
    res.send(course);
});

app.get('/', (req, res)=> {
    res.write("Hello World!");
    res.end();
});

app.get('/api/courses/', (req, res)=> {
    res.send(courses);
    res.end();
});

app.get('/api/courses/:id', (req, res)=> {
    // Get the course based on given id
    const course = courses.find(c => c.id===parseInt(req.params.id));
    // Throw error if it doesn't exist
    if(!course) return res.status(404).send("Course ID doesn't exist");
    // send the course if it is available
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Get the course
    const course = courses.find(c => c.id===parseInt(req.params.id));
    // Throw error if the course ID not found
    if(!course) return res.status(400).send("Course with given ID not found");
    // If Course ID is found, Update it
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    // Send the course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Check whether course ID exist or not
    const course = courses.find(c => c.id===parseInt(req.params.id));
    // if it doesn't exist, throw error
    if(!course) return res.status(400).send('Course with the given ID not found');
    // Delete the course based on id provided
    courses.splice(courses.indexOf(course),1);
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening to the port ${port}...`));