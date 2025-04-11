<?php

// database/factories/PhotoFactory.php

namespace Database\Factories;

use App\Models\Photo;
use Illuminate\Database\Eloquent\Factories\Factory;

class PhotoFactory extends Factory
{
    protected $model = Photo::class;

    public function definition()
    {
        return [
            'user_id' => '1',
            'path' => 'photos/' . $this->faker->uuid . '.jpg',
            'original_name' => $this->faker->word . '.jpg',
            'description' => $this->faker->sentence,
            'size' => $this->faker->numberBetween(1000, 10000),
            'mime_type' => 'image/jpeg',
        ];
    }
}