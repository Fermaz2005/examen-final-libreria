//Aplicacion en consola para la empresa 
import promptSync from 'prompt-sync';
import chalk from 'chalk';
import fs from 'fs';

const prompt = promptSync();
let catalogo = [];

function guardarCatalogo() {
    fs.writeFileSync('catalogo.json', JSON.stringify(catalogo, null, 2));
}
// 1. Agregar libro
function agregarLibro() {
  console.log(chalk.green('Agregar nuevo libro'));
  const titulo = prompt('Título: ');
  const autor = prompt('Autor: ');
  const precio = parseFloat(prompt('Precio: '));
  const anio = parseInt(prompt('Anio de publicación: '));

  if (!titulo || !autor || isNaN(precio) || isNaN(anio) || precio <= 0) {
    console.log(chalk.red('Datos inválidos. Intente nuevamente.'));
    return;
  }

  catalogo.push({titulo, autor, precio, anio});
  guardarCatalogo();
  console.log(chalk.green('Libro agregado exitosamente.'));
}
// 2. Mostrar catálogo
function mostrarCatalogo() {
  if (catalogo.length === 0) {
    console.log(chalk.yellow('No hay libros en el catálogo.'));
    return;
  }

  console.log(chalk.blue('Catálogo de Libros'));
  catalogo.forEach((libro, index) => {
    console.log(chalk.cyan(`Libro #${index + 1}`));
    console.log(`Título: ${libro.titulo}`);
    console.log(`Autor: ${libro.autor}`);
    console.log(`Precio: ${libro.precio.toFixed(2)}`);
    console.log(`Año: ${libro.anio}`);
  });
}
// 3. Buscar libro
function buscarLibro() {
  const titulo = prompt('Ingrese el título a buscar: ');
  const libro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());

  if (libro) {
    console.log(chalk.green('Libro encontrado:'));
    console.log(`Título: ${libro.titulo}`);
    console.log(`Autor: ${libro.autor}`);
    console.log(`Precio: ${libro.precio}`);
    console.log(`Año: ${libro.anio}`);
  } else {
    console.log(chalk.red('Libro no encontrado.'));
  }
}
// 4. Eliminar libro
function eliminarLibro() {
  const titulo = prompt('Ingrese el título del libro a eliminar: ');
  const index = catalogo.findIndex(l => l.titulo.toLowerCase() === titulo.toLowerCase());

  if (index !== -1) {
    catalogo.splice(index, 1);
    guardarCatalogo();
    console.log(chalk.green('Libro eliminado exitosamente.'));
  } else {
    console.log(chalk.red('Libro no encontrado.'));
  }
}
// 5. Estadísticas
function verEstadisticas() {
  if (catalogo.length === 0) {
    console.log(chalk.yellow('No hay libros para analizar.'));
    return;
  }

  const cantidad = catalogo.length;
  const promedio = catalogo.reduce((acc, l) => acc + l.precio, 0) / cantidad;
  const masAntiguo = catalogo.reduce((min, l) => (l.anio < min.anio ? l : min));
  const masCaro = catalogo.reduce((max, l) => (l.precio > max.precio ? l : max));

  console.log(chalk.magenta('Estadísticas'));
  console.log(`Total de libros: ${cantidad}`);
  console.log(`Precio promedio: ${promedio.toFixed(2)}`);
  console.log(`Libro más antiguo: ${masAntiguo.titulo} (${masAntiguo.anio})`);
  console.log(`Libro más caro: ${masCaro.titulo} ($${masCaro.precio.toFixed(2)})`);
}
// 6. Ordenar libros
function ordenarLibros() {
  console.log('Precio ascendente');
  console.log('2. Precio descendente');
  console.log('3. Año de publicación');

  const opcion = prompt('Elige una opción de ordenamiento: ');

  if (opcion === '1') {
    catalogo.sort((a, b) => a.precio - b.precio);
    console.log(chalk.green('Ordenado por precio ascendente.'));
  } else if (opcion === '2') {
    catalogo.sort((a, b) => b.precio - a.precio);
    console.log(chalk.green('Ordenado por precio descendente.'));
  } else if (opcion === '3') {
    catalogo.sort((a, b) => a.anio - b.anio);
    console.log(chalk.green('Ordenado por año de publicación.'));
  } else {
    console.log(chalk.red('Opción inválida.'));
  }
}
// 7. Editar libro
function editarLibro() {
  const titulo = prompt('Ingrese el título del libro a editar: ');
  const libro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());

  if (!libro) {
    console.log(chalk.red('Libro no encontrado.'));
    return;
  }

  console.log(chalk.yellow('Editando libro. Deja en blanco para mantener el valor actual.'));
  const nuevoTitulo = prompt(`Nuevo título (${libro.titulo}): `);
  const nuevoAutor = prompt(`Nuevo autor (${libro.autor}): `);
  const nuevoPrecio = prompt(`Nuevo precio (${libro.precio}): `);
  const nuevoAnio = prompt(`Nuevo año (${libro.anio}): `);

  if (nuevoTitulo) libro.titulo = nuevoTitulo;
  if (nuevoAutor) libro.autor = nuevoAutor;
  if (!isNaN(parseFloat(nuevoPrecio))) libro.precio = parseFloat(nuevoPrecio);
  if (!isNaN(parseInt(nuevoAnio))) libro.anio = parseInt(nuevoAnio);

  guardarCatalogo();
  console.log(chalk.green('Libro actualizado.'));
}
// 8. Filtrar por autor (punto extra)
function filtrarPorAutor() {
  const autor = prompt('Ingrese el autor a filtrar: ');
  const libros = catalogo.filter(l => l.autor.toLowerCase() === autor.toLowerCase());

  if (libros.length === 0) {
    console.log(chalk.red('No se encontraron libros de ese autor.'));
  } else {
    console.log(chalk.blue(`Libros de ${autor}`));
    libros.forEach(l => {
      console.log(`- ${l.titulo} ($${l.precio}, ${l.anio})`);
    });
  }
}
// Menú principal
function mostrarMenu() {
  console.log(chalk.blue.bold('MENÚ PRINCIPAL - El Rincón del Saber'));
  console.log('1. Agregar libro');
  console.log('2. Mostrar catálogo');
  console.log('3. Buscar libro por título');
  console.log('4. Eliminar libro');
  console.log('5. Ver estadísticas');
  console.log('6. Ordenar libros');
  console.log('7. Editar libro');
  console.log('8. Filtrar por autor');
  console.log('9. Salir');
}
let salir = false;
while (!salir) {
  mostrarMenu();
  const opcion = prompt(chalk.yellow('Seleccione una opción: '));

  switch (opcion) {
    case '1':
      agregarLibro();
      break;
    case '2':
      mostrarCatalogo();
      break;
    case '3':
      buscarLibro();
      break;
    case '4':
      eliminarLibro();
      break;
    case '5':
      verEstadisticas();
      break;
    case '6':
      ordenarLibros();
      break;
    case '7':
      editarLibro();
      break;
    case '8':
      filtrarPorAutor();
      break;
    case '9':
      console.log(chalk.cyan('¡Gracias por usar el sistema!'));
      salir = true;
      break;
    default:
      console.log(chalk.red('Opción no válida. Intente de nuevo.'));
  }
}