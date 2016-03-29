# Ideabox

Author: Hector Huertas

[Live on Heroku](https://ideabox-hector.herokuapp.com/)

[Original project specifications](/lib/assets/original_specs.md)

## Overview

Ideabox is an idea manager built as a rails single-page application. It uses JavaScript and jQuery to provide most of the functionality. At the server side, an internal API enables the creation and management of ideas.

## Screenshot

![Screenshot](/app/assets/images/ideabox.gif)

## Deployment

1. Clone the repo: ``` $ git clone https://github.com/hectorhuertas/rails_engine.git ```
2. Create and migrate the database: ``` $ rake db:setup ```

## Using Ideabox

The application is very simple and easy to use

### Add and idea

1. Enter an idea title in the box at the top
2. Enter an idea description next to the title
3. Optionally, enter tags separated by commas
3. Click on the save button

New ideas have a default quality of 'swill', and both title and description are required.

Additionally, if an idea's body has more than 100 characters, the body will be truncated to the closest word that is less than the 100 character limit and an ellipses will be added to the end.

### Edit an idea

1. Clicking on the title and/or body will make the fields editable.
2. Clicking anywhere else will save the changes made to the idea
3. Idea's quality can be changed by clicking the thumbs up or thumbs down buttons

### Delete an idea

1. Click on the trash can on the top right corner of the idea

### Filter ideas

#### By Content

* Start typing text into the search box. If the text matches any part of an idea's title or description, the idea will be shown. Otherwise, it will be hidden.

#### By Tags

* Clicking on a tag of the filters box will hide all ideas without the given tag. If more tags are clicked, only ideas with every selected tag will be shown.

#### Clear filters

* By clicking on the "Clear All" button, every filter by content or tag will be removed, making all ideas visible.

### Sort by quality

1. Click on the sort by quality button to sort ideas descending by their quality level.
2. Click it again to sort ascending by quality level.
