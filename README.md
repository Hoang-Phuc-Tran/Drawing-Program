


https://github.com/Hoang-Phuc-Tran/Drawing-Program/assets/120700092/87050438-e8d0-4117-9739-bf17da47e341


# Interactive Drawing Application

This project is an interactive drawing application that allows users to create and transform shapes within a browser window. The application features a dedicated toolbar for various transformations and a drawing area where shapes can be manipulated directly through user input.

## Requirements

### Screen Layout

- The application fills the entire drawable area of the browser window.
- A 150-pixel wide toolbar area is located on the left side of the browser window.
- The remaining space serves as the drawing area for shapes.
- A 10-pixel wide border separates the toolbar from the drawing area.
- The toolbar, drawing area, and the border have distinct background colors for clear differentiation.

### Toolbar

The toolbar includes buttons with the following functionalities:

- **Rotate CW 45 degrees**: Rotates all drawn vertices 45 degrees clockwise around the pivot point.
- **Rotate CCW 45 degrees**: Rotates all drawn vertices 45 degrees counterclockwise around the pivot point.
- **Move**: Four separate buttons to move all vertices left, right, up, and down by 10 pixels (excluding the pivot point).
- **Scale**: Two buttons to scale up and down the vertices by 5% relative to the pivot point.
- **Clear Canvas**: Removes all vertices and resets the pivot point to its default location.
- **Toggle Pivot Placement Mode**: Changes response to clicks on the drawing board and provides a visual indication of the current mode.

Images on the buttons should be intuitive and can be sourced from the provided asset links:

- [Kenney Game Icons](https://kenney.nl/assets/game-icons)
- [Kenney Game Icons Expansion](https://kenney.nl/assets/game-icons-expansion)

A custom button class should be created for this application, which includes image handling and click detection functionality.

### Drawing Board

- Responds to user clicks by adding a vertex or setting the pivot point based on the selected mode.
- Vertices are displayed as red circles (6 pixels in diameter) and connected by a 3 pixel wide blue line to form shapes.
- The pivot point is represented by a green circle (6 pixels in diameter) and is centrally located by default.

### Transformation Functions

Custom transformation functions must be written:

- Matrix multiplication and translation functions should be based on Week 4 lab examples.
- Functions for rotation and scaling must account for the pivot point location.
- p5.js transformation functions should not be used; all transformations are to be handled by the custom functions.

## Contact

For any questions or concerns regarding this project, please reach out to the project maintainer.

Thank you for exploring the Interactive Drawing Application!
