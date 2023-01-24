# Hexadrop

Hexadrop es un conjunto de opinionadas librerías que te permite implementar
de manera fácil un proyecto utilizando DDD y arquitectura hexagonal.

Actualmente, existen las siguientes librerías:

-   [@hexadrop/core](./packages/core): Es la dependencia principal del proyecto.
    Exporta una clase de la que tendrá que extender todas nuestras entidades de dominio, asi
    como otras utilidades y value objects.

-   [@hexadrop/in-memory](./packages/in-memory-bus): Contiene varias implementaciones en memoria
    del `CommandBus`, `QueryBus` y `EventBus`.

-   [@hexadrop/mother](./packages/mother): Exportan varias clases `Mother` lista para ser
    usadas en tus tests.

-   [@hexadrop/ploc](./packages/ploc): Exporta una clase de la que extender para implementar el patrón
    Presentation of Logic (PLOC).
