import React from 'react';
import {Link} from 'react-router-dom';

function ProjectItem(project) {
  const url = `/projects/${project.id}`
  return <li key={url}>
    {project.id}&nbsp;&nbsp;
    <Link to={url}>show me</Link>
  </li>
}
export default function ProjectsView(props) {
  return <div>
    <ul>
      {props.projects.map(ProjectItem)} 
    </ul>
  </div>

}