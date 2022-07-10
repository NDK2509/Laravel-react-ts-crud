<?php

namespace Database\Factories;

use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeightHistory>
 */
class WeightHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        try {
            return [
                "cat_id" => rand(1, 10),
                "weight" => rand(1, 4)
            ];
        }
        catch(Exception $e) {
            return null;
        }
        
    }
}
