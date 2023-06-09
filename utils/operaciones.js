const fs = require('fs/promises');
const { v4: uuid } = require('uuid');

const leerAnime = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let animes = await fs.readFile('./db/anime.json', 'utf8');
			let formatAnimes = JSON.parse(animes);
			resolve(formatAnimes);
		} catch (error) {
			reject('Error al leer archivo anime.json');
		}
	});
};

const buscarPorNombre = (nombre) => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await leerAnime();
			let animeEncontrado = data.animes.find(
				(anime) => anime.nombre.toLowerCase() == nombre.toLowerCase()
			);
			resolve(animeEncontrado);
		} catch (error) {
			reject('Anime no encontrado');
		}
	});
};

const agregarAnime = (nombre, genero, year, autor) => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await leerAnime();
			let nuevoAnime = {
				nombre,
				genero,
				year,
				autor,
				id: uuid().slice(0, 6),
			};
			console.log(data)
			data.animes.push(nuevoAnime);
			await fs.writeFile(
				'./db/anime.json',
				JSON.stringify(data, null, 4),
				'utf8'
			);
			resolve(
				`Se ha guardado correctamente el nuevo anime ${nuevoAnime.nombre}`
			);
		} catch (error) {
			reject(error);
		}
	});
};

const actualizarAnime = (id, nombre, genero, year, autor) => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await leerAnime();
			let indexEncontrado = data.animes.findIndex((anime) => anime.id == id);
			let animeEncontrado = data.animes[indexEncontrado];

			animeEncontrado.nombre = nombre;
			animeEncontrado.genero = genero;
			animeEncontrado.year = year;
			animeEncontrado.autor = autor;
			await fs.writeFile(
				'./db/anime.json',
				JSON.stringify(data, null, 4),
				'utf8'
			);
			resolve(`Anime ${animeEncontrado.nombre} actualizado con éxito`);
		} catch (error) {
			reject('Error al actualizar el anime');
		}
	});
};

const borrarAnime = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await leerAnime();
			let indexEncontrado = data.animes.findIndex((anime) => anime.id == id);
			data.animes.splice(indexEncontrado, 1);
			await fs.writeFile(
				'./db/anime.json',
				JSON.stringify(data, null, 4),
				'utf8'
			);
			resolve('Anime borrado con exito');
		} catch (error) {
			reject('Error al intentar borrar el anime');
		}
	});
};

module.exports = {
	leerAnime,
	buscarPorNombre,
	agregarAnime,
	actualizarAnime,
	borrarAnime,
};
