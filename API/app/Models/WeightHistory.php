<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeightHistory extends Model
{
    use HasFactory;
    public function cat() {
        return $this->belongsTo(Cat::class, "cat_id", "cat_id");
    }
}
