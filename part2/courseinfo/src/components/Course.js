import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>
                {props.course}
            </h2>
        </div>
    )
}



const Part = (props) => {
    return (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
    )
}

const Content = (props) => {
          
    const rows = () => props.parts.map(part =>
        <Part 
            key={part.id}
            part={part}
        />
    )

    return (
        <div>
            {rows()}
        </div>
    )
        
    
}

const Total = (props) => {
    
    const total = () => props.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)
    return (
        <p><b> Total of {total()} exercises</b></p>          
    )
}

const CoursePart  = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts}/>
            <Total parts={props.course.parts}/>
        </div>
    )
}

const Course = ({courses}) => {    
        
        const cour = () => courses.map(course =>                 
                <CoursePart 
                key={course.name}
                course={course} />
           )
        
        return (
            <div>
              <h1>Web development Curriculum</h1>
                {cour()}
            </div>
        )
    
}

export default Course