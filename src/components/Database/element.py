from datetime import datetime

class Element:
    def __init__(self, numero, nombre, placa, valor_parqueadero, fecha_inicio, fecha_fin):
        self.numero = numero
        self.nombre = nombre
        self.placa = placa
        self.valor_parqueadero = valor_parqueadero
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin

    def toDBCollection(self):
        # Convertir las fechas de inicio y fin a cadenas en formato normal
        fecha_inicio_str = self.fecha_inicio.strftime("%Y-%m-%d %H:%M:%S")
        fecha_fin_str = self.fecha_fin.strftime("%Y-%m-%d %H:%M:%S")
        
        return {
            'número': self.numero,
            'nombre': self.nombre,
            'placa': self.placa,
            'Valor_parqueadero': self.valor_parqueadero,
            'fecha_inicio': fecha_inicio_str,
            'fecha_fin': fecha_fin_str
        }

# Datos de ejemplo
numero = 1
nombre = "civic con portatil"
placa = "ABC123"
valor_parqueadero = 10000
fecha_inicio = datetime(2021, 10, 10, 10, 0, 0)
fecha_fin = datetime(2021, 10, 10, 12, 0, 0)

# Crear una instancia de la clase Element
elemento = Element(numero, nombre, placa, valor_parqueadero, fecha_inicio, fecha_fin)

# Obtener el diccionario para insertar en la base de datos
datos_para_insertar = elemento.toDBCollection()

print(datos_para_insertar)
