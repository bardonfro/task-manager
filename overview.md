# Focus Manager
Project for Odin Project

# Objects

### Data

- Warehouse (information holder)
    - Stores data
    - Prevents thing from getting lost
    - Knows where things are stored
    - Receives requests from the gatekeeper and supplies requested object

- Gatekeeper (interfacer)
    - Receives objects and passes them to warehouse
    - Translates between warehouse and other worker
    - Receives requests for objects and requests them from the warehouse

- Project creator (service provider)
    - Receives requests for a project and creates it

- Task creator (service provider)
    - Receives requests for a task and creates it

- Project (information holder)
    - Stores information about itself: Title, included tasks, status(es), due date
    - Passes state changes to display controller
    - Recieves state updates from display controller

- Task (information holder)
    - Stores information about itself: Title, project, due date, completion, status
    - Passes state changes to display controller and project
    - Receives state updates from display controller

### Display

- Display controller (controller)
    - Orders rendering of display components
    - Receives notification of user action and decides what to do about it

- Display listener (coordinator)
    - Receives user-generated events and routes them to the appropriate destination

- Display component registry (structurer/information holder)
    - Knows relationships between DOM elements and objects
    - 

- Render controller (controller/coordinator)
    - Requests elements from renderers
    - Places the elements in order

- Renderers (service providers)
    - For each type of element
    - Receives request for an element and creates it