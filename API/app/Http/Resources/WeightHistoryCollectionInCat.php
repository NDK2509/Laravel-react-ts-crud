<?php
namespace App\Http\Resources;
use Illuminate\Database\Eloquent\Collection;

class WeightHistoryCollectionInCat {
  public static function convert(Collection $weightHistoryCollection) {
    return array_map(fn($history) => [
      "weight" => $history["weight"],
      "createdAt" => $history["created_at"]
    ], $weightHistoryCollection->toArray());
  }
}

?>