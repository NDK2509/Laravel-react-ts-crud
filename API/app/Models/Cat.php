<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cat extends Model
{
    use HasFactory;
    public function weightHistories() {
        return $this->hasMany(WeightHistory::class, "cat_id", "id");
    }
}
