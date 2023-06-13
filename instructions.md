# U-KNOW: La plataforma de aprendizaje cooperativo. Paso 2 Diseño y Desarrollo del backend (APIRest)

## Introducción

Somos una start-up que queremos cambiar el modelo de compartir conocimientos para favorecer el aprendizaje cooperativo y...divertirnos un poco también.

Queremos crear U-KNOW, la nueva plataforma de intercambio de conocimientos y aprendizaje cooperativo. Nuestra aplicación se basará en el sistema de recompensas para mantener la calidad de los contenidos y favorecer la participación.

Enhorabuena equipo, habéis empezado a desarrollar nuestra aplicación web y estamos bastante satisfechos del trabajo realizado con la base de datos. Ahora nos gustaría que abordaseis la parte del backend de nuestra aplicación. 

Hemos seguido analizando los requerimientos que queremos tener en nuestra aplicación y os los detallamos a continuación:

## Requerimientos funcionales

<details>
  <summary><b>Usuaria no registrada</b></summary>
  
  - Puede ver la lista de contenidos ordenada por valoración
  - Puede realizar búsquedas por palabras claves o etiquetas
  - Puede registrarse
  
  </details>
  <details>
  <summary><b>Usuaria registrada</b></summary>
  
  - Puede logarse
  - Puede recuperar la contraseña
  - Puede ver la lista de contenidos ordenada por valoración
  - Puede realizar búsquedas por palabras claves o etiquetas
  - Puede actualizar su perfil (menos nombre, email y wallet)
  - Puede crear contenido
  - Puede editar contenido
  - Puede eliminar contenido, si no ha sido comprado
  - Puede visualizar la lista de contenido creado
  - Puede comprar contenido
  - Puede visualiza la lista de contenido comprado
  - Puede visualizar un contenido comprado
  - Puede valorar contenido comprado (sólo 1 vez)
  - Puede comentar contenido comprado (sólo 1 vez)
  - Puede enviar una notificación de chat a una autora de contenido
  - Puede visualizar notificaciones de chat sobre algún contenido
  - Puede intercambiar mensajes de chat con una autora de contenido, o solicitante

  </details>
  <details>
  <summary><b>Administradora de la aplicación</b></summary>
  
  - Puede ver la lista de contenidos
  - Puede realizar búsquedas por palabras claves o etiquetas
  - Puede eliminar contenido
  - Puede ver lista de usuarias
  - Puede eliminar una usuaria
  - Puede actualizar una usuaria
    
  </details>

  <details>
  <summary><b>Sistema</b></summary>
  
  - Actualiza el wallet de la usuaria cuando se registra
  - Actualiza el wallet de la usuaria cuando compra contenido
  - Actualiza el precio del contenido cuando se publica
  - Notifica a la usuaria que no tiene saldo para comprar contenido si el wallet es inferior al precio del contenido
  - Ajusta la valoración del curso con cada valoración de una usuaria
    - Las 4 primeras valoraciones solo contarán como >= a 4.8
    - A partir de la 5ª valoración se hace la media
    - Comunica en tiempo real la valoración del curso   
  - Actualiza el precio del contenido cuando alcanza una media de valoración < = 3
  - Chequea el contenido para buscar plagios.
  - Puede actualizar una usuaria
    
  </details>

## Requerimientos Técnicos
  
  - Incluir una o varias medidas de seguridad: https://nodejs.org/en/docs/guides/security
  - Incluir medidas de perfomance de bbdd (índices)
  - Incluir Linting
  - Incluir testing unitario y testing de integración de todos los endpoints
  - Incluir documentación con OpenAPI ([Swagger](https://swagger.io/tools/open-source/getting-started/))
  - Dockerizar API y BBDD
  - Desplegar mediante CI/CD con GitHub Actions

## Modalidad Pedagógica
  - Proyecto grupal
  - Desarrollo en 3 sprints, 1 semana de duración cada uno
  - Fecha de presentación: 4/7/2023
  
## Evaluación
  - Vía pull-request a través de Github-classromm
  - Comentarios orales día de la presentación
  - Autoevaluación

## Entregables
- Repositorio de GitHub que contenga la siguiente información:
  - Readme con índice,contenido del repositorio, las tecnologías utilizadas, links a los recursos
  - Modelo lógico de la base de datos.
  - Fichero de dump de la base de datos.
- Presentación
  
## Criterios de rendimiento
  |  | 1 | 2 | 3 |
| --- | --- | --- | --- |
| Indicador | Deficiente | Regular | Excelente |
| Trabajo en equipo | Ha habido problemas de comunicación, alguno de los miembros del equipo no ha participado en el desarrollo y/o no conoce el funcionamiento de la API. | Se ha trabajado de forma modular, pero no se ha trabajado de forma equitativa en cuanto a cantidad y complejidad del trabajo. Ha habido algún problema de comunicación | Se dividió la carga de trabajo por igual, los dos han contribuido al desarrollo del trabajo y conocen por igual todos los detalles del proyecto |
| Documentación de la API | La documentación es incorrecta, omite servicios o estos no se corresponden con la implementación, no hay descripción de historias de usuario | La documentación es completa o faltan pocas especificaciones. Falta claridad en la descripción. Faltan historias de usuario y a las que hay les falta información | La documentación es clara y corresponde perfectamente a los servicios. Cuenta con descripciones detalladas y es intuitiva. Se describen las historias de usuario con tareas y criterios de aceptación asociados. |
| Testing | El porcentaje de cobertura de los tests no supera el 50% | El % de cobertura es inferior al 80% | El % de cobertura es superior al 80% |
| Implementación de la API | Hay requerimientos que no se resolvieron o su solución es incorrecta. El código es confuso y carece de buenas prácticas. Falta el desarrollo de muchos servicios o éstos son incorrectos. Las consultas a la bbdd son muy ineficientes, lo cual aumenta el tiempo de respuesta. El comportamiento de los endpoints no es el esperado. | Se resuelven satisfactoriamente los requerimientos especificados, pero el código podría mejorarse con buenas prácticas o limpieza. Sobra código o es redundante. | El código es limpio y está bien estructurado. Resuelve satisfactoriamente los requerimientos del proyecto. Se aplicaron buenas prácticas de programación: responsabilidad única, no es redundante y no mezcla capas de abstracción. Las conexiones a la bbbdd son eficientes. |
| Comunicación del Proyecto | No quedan claros la motivación ni los requerimientos del proyecto. No es posible conocer la evolución del proyecto. La presentación es incompleta y carece de hilo conductor. No refleja para nada el trabajo realizado | Existe cierta calidad en la presentación aunque faltan apartados o estos no están claramente definidos. Existe cierto grado de confusión pero refleja el desarrollo | Las presentaciones están bien preparadas, se ajustan a los apartados requeridos y reflejan correctamente la evolución del proyecto. |
