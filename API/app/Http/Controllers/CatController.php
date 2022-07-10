<?php

namespace App\Http\Controllers;

use App\Http\Resources\CatCollection;
use App\Http\Resources\CatResource;
use App\Models\Cat;
use App\Models\WeightHistory;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CatController extends Controller
{
    public function all()
    {
        $cats = Cat::get();
        return $cats == null ? ["error" => "No data!", "status" => "fail"] : new CatCollection($cats);
    }
    public function get($id)
    {
        $cat = Cat::find($id);
        return $cat == null ? ["error" => "Can't find this cat!", "status" => "fail"] : new CatResource($cat);
    }
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            "name" => "required",
            "age" => "required|integer|min:0",
            "weight" => "required|integer",
            "img" => "required|image|max:2048"
        ]);
        if ($validator->fails()) {
            return ["error" => $validator->errors(), "status" => "fail"];
        }
        try {
            $imgFile = $req->file("img");
            $imgName = time() . "_" . $imgFile->getClientOriginalName();
            $imgFile->move(public_path("images"), $imgName);
            $cat = new Cat();
            $cat->name = $req->name;
            $cat->age = $req->age;
            $cat->img = $imgName;
            $cat->created_at = date_create();
            $cat->save();

            $weight = new WeightHistory();
            $weight->cat_id = $cat->id;
            $weight->weight = $req->weight;
            $weight->created_at = date_create();
            $weight->save();
            return ["error" => "", "status" => "created", "data" => $cat];
        } catch (Exception $e) {
            return ["error" => $e->getMessage(), "status" => "fail"];
        }
    }
    function update(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            "name" => "required",
            "age" => "required|integer|min:0",
            "img" => "image|max:2048"
        ]);
        if ($validator->fails()) {
            return ["error" => $validator->errors(), "status" => "fail"];
        }
        $cat = Cat::find($id);
        try {
            if ($req->hasFile("img")) {
                $imgFile = $req->file("img");
                $imgName = time() . "_" . $imgFile->getClientOriginalName();
                $imgFile->move(public_path("images"), $imgName);
                if (file_exists("/images/" . $cat->img)) unlink("images/" . $cat->img);
                $cat->img = $imgName;
            }
            $cat->name = $req->name;
            $cat->age = $req->age;
            $cat->updated_at = date_create();
            $cat->save();
            $weight = new WeightHistory();
            $weight->cat_id = $cat->id;
            $weight->weight = $req->weight;
            $weight->created_at = date_create();
            $weight->save();
            return ["error" => "", "status" => "updated", "data" => $cat];
        } catch (Exception $e) {
            return ["error" => $e->getMessage(), "status" => "fail"];
        }
    }
    public function delete($id)
    {
        $cat = Cat::find($id);
        try {
            if ($cat == null) {
                return ["error" => "Can't find this cat!", "status" => "fail"];
            }
            if (file_exists("/images/" . $cat->img)) unlink("images/" . $cat->img);
            $cat->delete();
        } catch (Exception $e) {
            return ["error" => $e->getMessage()];
        }
    }
}
