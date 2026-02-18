DROP DATABASE IF EXISTS escuela;
CREATE DATABASE escuela;
USE escuela;

-- USUARIOS
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- ESTUDIANTE
CREATE TABLE estudiante (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE,
  fecha_nacimiento DATE
) ENGINE=InnoDB;

-- CURSOS
CREATE TABLE cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
) ENGINE=InnoDB;

-- NOTAS
CREATE TABLE notas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  estudiante_id INT NOT NULL,
  curso_id INT NOT NULL,
  nota DECIMAL(4,2),
  FOREIGN KEY (estudiante_id) REFERENCES estudiante(id) ON DELETE CASCADE,
  FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
  UNIQUE(estudiante_id, curso_id)
) ENGINE=InnoDB;

-- ========== DATOS DE PRUEBA ==========

-- Password: Admin123!
INSERT INTO usuarios (email, password) VALUES
('admin@escuela.edu', '$2b$10$17qsCJk5wphv3PJyeXOo9.0aVn1hEMmyYKmK9IPoaKIgbyqob8nHq');

INSERT INTO estudiante (nombre, apellido, email, fecha_nacimiento) VALUES
('Juan', 'Perez', 'juan@escuela.edu', '2002-03-15'),
('Maria', 'Gomez', 'maria@escuela.edu', '2001-07-22'),
('Carlos', 'Rodriguez', 'carlos@escuela.edu', '2003-01-10'),
('Ana', 'Martinez', 'ana@escuela.edu', '2002-11-05');

INSERT INTO cursos (nombre, descripcion) VALUES
('Matematicas', 'Curso de matemáticas básicas'),
('Historia', 'Historia universal'),
('Programacion', 'Introducción a la programación');

INSERT INTO notas (estudiante_id, curso_id, nota) VALUES
(1, 1, 85.50),
(1, 2, 90.00),
(2, 1, 78.25),
(2, 3, 95.00),
(3, 2, 88.75),
(4, 3, 92.00);
