<?php namespace App\Controllers;

use CodeIgniter\Controller;
Use App\Models\CustomerModel;
 
class CustomerController extends Controller
{

	protected $usuarios;
    protected $request;

	public function __construct()
	{
		 $this->usuarios = new CustomerModel();
         $this->request = \Config\Services::request();
	}

	public function index()
	{
		return view('customer');
	}

	public function test()
	{
		$data = $this->usuarios->findAll();
		return json_encode($data);
	}

    public function list()
  {
    try {
      $data = $this->usuarios->findAll();
      $response['data'] = $data;
      $response['success'] = true;
      $response['message'] = "Successful load";
      return json_encode($response);
    } catch (\Exception $e) {
      $response['success'] = false;
      $response['message'] = $e->getMessage();
      return json_encode($response);
    }
}

// add function for delete 
public function delete($id)
{
  try {
    // $res = $this->usuarios->where("id",$id)->delete();
    $res = $this->usuarios->delete($id);
        $response['res'] = $res;
        $response['success'] = true;
        $response['message'] = "Successful delete";
        return json_encode($response);
  }
  catch (\Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
    return json_encode($response);
  } 
}

// add function for get 
public function get($id)
{
  try {
    $data = $this->usuarios->find($id);
    if ($data) {
      $response['data'] = $data;
      $response['success'] = true;
      $response['message'] = "Successful load";
    }
    else { 
      $response['success'] = false;
      $response['message'] = "Not found data";
    }
    return json_encode($response);
  } catch (\Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
    return json_encode($response);
  }
}

// add function for update 
public function update($id)
{
    try {
      $json = $this->request->getJSON();
      $update['nombre'] = $json->nombre;
      $update['correo_electronico'] = $json->correo_electronico;
      $update['contraseña'] = $json->contraseña;
      $res = $this->usuarios->update($id,$update);
      $response['success'] = true;
      $response['message'] = "Successful update";
      return json_encode($response);
    } catch (\Exception $e) {
      $response['success'] = false;
      $response['message'] = $e->getMessage();
      return json_encode($response);
    }
}

    public function create()
  {
    try {
      $json = $this->request->getJSON();
      // create data
      $insert['nombre'] = $json->nombre;
      $insert['correo_electronico'] = $json->correo_electronico;
      $insert['contraseña'] = $json->contraseña;
      $res = $this->usuarios->insert($insert);
      $response['success'] = true;
      $response['message'] = "Successfully saved";
      return json_encode($response);
    }
    catch (\Exception $e)
    {
      $response['success'] = false;
      $response['message'] = $e->getMessage();
      return json_encode($response);
    }
  }
}