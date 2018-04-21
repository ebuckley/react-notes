import React, { Component } from 'react';

import firebase from 'firebase';

function ProjectItem(project) {
  return <li>
    {project.id}
    <a href="javascript:void()"> show me</a>
  </li>
}
export default function ProjectsView(props) {
  return <div>
    <h1>Load a project</h1>
    <ul>
      {props.projects.map(ProjectItem)} 
    </ul>
  </div>

}