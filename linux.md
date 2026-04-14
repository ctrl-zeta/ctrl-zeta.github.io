### Enumeracion

- **`hostname`**: Nombre del host de destino.
- **`uname -a`**: Detalles adicionales sobre el kernel utilizado por el sistema.
- **`/proc/version`**: El sistema de archivos proc (procfs) proporciona información sobre el sistema de destino. También brinda información adicional del kernel.
- **`/etc/issue`**: Archivo que suele contener cierta información sobre el sistema operativo, pero se puede personalizar o cambiar fácilmente.
- `ss -tuln`: Puertos abiertos.
- `ps`: Se mostrarán los procesos de la sesión actual:
	- PID: Identificador del proceso (único para cada proceso).
	- TTY: Tipo de terminal utilizado por el usuario.
	- Time: Cantidad de tiempo de CPU utilizado por el proceso.
	- CMD: Comando o ejecutable en ejecución.
	
	El comando `ps` ofrece algunas opciones útiles.
	- `ps -A`: Muestra todos los procesos en ejecución.
	- `ps axfj`: Muestra árbol de procesos.
	- `ps aux`: Muestra proceso de todos los usuarios (`a`), el usuario que inicio el proceso (`u`) y los procesos que no están conectados a una terminal (`x`).
- **`env`**: Variables de entorno.
- `sudo  -l`: Listar todos los comandos que su usuario puede ejecutar con sudo.
- `ifconfig`: Información sobre las interfaces de red del sistema.
- `ip route`: Rutas de red.
- `netstat`: Información sobre las conexiones existentes.
	- `netstat -a`: Muestra todos los puertos en escucha y las conexiones establecidas.
	-  `netstat -at` o `netstat -au`: Listar los protocolos TCP o UDP, respectivamente. `a` y `u` se pueden usar en diferentes combinaciones.
	- `netstat -l`: Lista los puertos en modo de escucha. 
	- `netsat -s`: Estadísticas de uso de red por protocolo.
	- `nestat -tp`: Muestra conexiones con el nombre de servicio y la información del PID. `l` para puertos en escucha.
	- `netstat -i`: Estadísticas de la interfaz:
		- `-a`: Muestra todos los sockets.
		- `-n`: No resolver nombres.
		- `-o`: Muestra temporizadores.
#### Comando find

- `find . -name <name>`: Buscar busca el archivo llamado `<name>` en el directorio actual. 
- `find /<name_directory> -name <name>`: Buscar el archivo llamado `<name>` en el directorio. `/home_directory`. 
- `find / -type d -name <name_directory>`: Busca el directorio llamado `<name_directory>` en `/`. 
- `find / -type f -perm 0777`: Busca archivos con permisos 777 (archivos legibles, escribibles y ejecutables por todos los usuarios). 
- `find / -perm a=x`: Busca archivos ejecutables. 
- `find /home -user <user>`: Busca todos los archivos del usuario `<user>` en `/home`. 
- `find / -mtime <cantidad_de_dias>:` Busca archivos modificados en los últimos `<cantidad_de_dias>` días. 
- `find / -atime <cantidad_de_dias>`: Busca archivos a los que se ha accedido en los últimos `<cantidad_de_dias>` días. 
- `find / -cmin -<cantidad_de_minutos>`: Busca archivos modificados en `<cantidad_de_minutos>`
- `find / -amin -<cantidad_de_minutos>`: Busca archivos a los que se ha accedieron en `<cantidad_de_minutos>`
- `find / -/+size <cantidad_pj:MB>`: Busca archivos de `<cantidad_pj:MB>` o más.
- `find / -writable -type d 2>/dev/null`: Busca carpetas con permisos de escritura para todos los usuarios.
- `find / -perm -222 -type d 2>/dev/null`: Busca carpetas con permisos de escritura para todos los usuarios.
- `find / -perm -o w -type d 2>/dev/nul`l: Busca carpetas con permisos de escritura para todos los usuarios.
- `find / -perm -o x -type d 2>/dev/null`: Busca carpetas con permisos de ejecución para todos los usuarios.
- `find / -name perl*`
- `find / -name python*`
- `find / -name gcc*`
- `find / -perm -u=s -type f 2>/dev/null`: Busca archivos con el bit SUID activado, lo que nos permite ejecutar el archivo con un nivel de privilegios superior al del usuario actual.
### Herramientas

> [!Links] 
> ```
> https://github.com/peass-ng/PEASS-ng/tree/master/linPEAS
> https://github.com/rebootuser/LinEnum
> https://github.com/The-Z-Labs/linux-exploit-suggester
> https://github.com/diego-treitos/linux-smart-enumeration
> https://github.com/linted/linuxprivchecker
> [https://github.com/DominicBreuker/pspy](https://github.com/DominicBreuker/pspy "https://github.com/DominicBreuker/pspy")
> ```
### SUID

SUID (Identificación de usuario) y SGID (Identificación de grupo). Estos permiten ejecutar archivos con el nivel de permisos del propietario del archivo o del grupo, respectivamente.

`find / -type f -perm -04000 -ls 2>/dev/null`: Se mostrarán los archivos que tengan los bits SUID o SGID activados.

> [!Link] 
>`https://gtfobins.org/`
#### Capabilities

Las Capabilities ayudan a gestionar los privilegios con mayor precisión

- `getcap`
- `getcap -r /` o `getcap -r / 2</dev/null` (como usuario sin privilegios).
### Cron Jobs

Las tareas cron se utilizan para ejecutar scripts o binarios en momentos específicos.

`/etc/crontab`
### PATH

Si una carpeta con permisos de escritura para tu usuario se encuentra en la ruta especificada, podrías potencialmente secuestrar una aplicación para ejecutar un script. En Linux, PATH es una variable de entorno que indica al sistema operativo dónde buscar archivos ejecutables. Para cualquier comando que no esté integrado en el intérprete de comandos o que no esté definido con una ruta absoluta, Linux comenzará a buscar en las carpetas definidas en PATH. (PATH es la variable de entorno a la que nos referimos, y ruta es la ubicación de un archivo).

`echo $PATH`

- ¿Qué carpetas se encuentran en $PATH?
- ¿Tiene su usuario actual permisos de escritura para alguna de estas carpetas?
- ¿Puede modificar $PATH?
- ¿Existe algún script o aplicación que pueda ejecutar y que se vea afectado por esta vulnerabilidad?

``find / -writable 2>/dev/null | cut -d "/" -f 2,3 | grep -v proc | sort -u``
### NFS

Este archivo se crea durante la instalación del servidor NFS y, por lo general, los usuarios pueden leerlo.

- `/etc/exports`
- `showmount -e <IP>`

---
