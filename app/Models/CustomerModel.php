<?php namespace App\Models;

use CodeIgniter\Model;

class CustomerModel extends Model
{
    // Tabla
   protected $table      = 'usuarios';
   // Llave primaria
   protected $primaryKey = 'id';

   // Retorna array
   protected $returnType = 'array';
   protected $useSoftDeletes = false;

   protected $allowedFields = [
     'nombre',
     'correo_electronico',
     'contraseña',
     'fecha_creacion'
   ];

   protected $useTimestamps = true;
   protected $createdField  = 'created_at';
   protected $updatedField  = 'updated_at';
   protected $deleted_at    = 'deleted_at';
}