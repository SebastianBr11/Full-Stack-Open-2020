import React from "react";
import ReactDOM from 'react-dom';


const Header = ({course}) => {

  return (
    <>
      <h2>{course.name}</h2>
    </>
  )
}

const Part = ({part}) => {
  console.log("part")
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </>
  )
}

const Total = ({parts}) => {
  const partsExercises = parts.map(part => part.exercises);
  return (
    <>
      <b>total of {partsExercises.reduce((acc, exer) => (
        acc += exer
      ))} exercises</b>
    </>
  ) 
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />  
    </>
  );
}

export default Course