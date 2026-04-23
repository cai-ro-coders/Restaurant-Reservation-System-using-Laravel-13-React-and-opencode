<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        if (Gallery::count() > 0) {
            return;
        }
        
        Gallery::unsetRelationsToBeRecalculated();
        $galleryImages = [
            [
                'image_url' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
                'caption' => 'Elegant restaurant interior',
                'alt_text' => 'Restaurant interior with wooden tables and warm lighting',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
                'caption' => 'Artfully prepared sushi platter',
                'alt_text' => 'Various sushi nigiri on a ceramic plate',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1571896349842-6e53ce41e887?w=800&q=80',
                'caption' => 'Chef preparingSignature dishes',
                'alt_text' => 'Chef cooking at the teppanyaki grill',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
                'caption' => 'Gourmet plating presentation',
                'alt_text' => 'Beautifully presented Asian cuisine',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
                'caption' => 'Romantic dinner setting',
                'alt_text' => 'Intimate dining table with candles and wine',
                'display_order' => 5,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
                'caption' => 'Fresh Asian ingredients',
                'alt_text' => 'Colorful Asian vegetables and garnishes',
                'display_order' => 6,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1540189549336-e6e2c4a3a234?w=800&q=80',
                'caption' => 'Seasonal menu highlights',
                'alt_text' => 'Fresh ingredients on display',
                'display_order' => 7,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1563245372-f21724e3856e?w=800&q=80',
                'caption' => 'Exquisite presentation',
                'alt_text' => 'Artfully plated dish with decorative elements',
                'display_order' => 8,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
                'caption' => 'Our master chef at work',
                'alt_text' => 'Chef preparing food in the kitchen',
                'display_order' => 9,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
                'caption' => 'Premium dining atmosphere',
                'alt_text' => 'Restaurant dining area with ambient lighting',
                'display_order' => 10,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
                'caption' => 'Signature wagyu dishes',
                'alt_text' => 'Premium beef dishes served elegantly',
                'display_order' => 11,
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
                'caption' => 'Fresh seafood selection',
                'alt_text' => 'Fresh uni and seafood appetizers',
                'display_order' => 12,
                'is_active' => true,
            ],
        ];

        foreach ($galleryImages as $image) {
            Gallery::create($image);
        }
    }
}