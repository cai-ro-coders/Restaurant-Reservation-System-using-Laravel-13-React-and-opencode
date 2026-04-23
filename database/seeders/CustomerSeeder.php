<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        if (Customer::count() > 0) {
            return;
        }
        
        $customers = [
            [
                'first_name' => 'James',
                'last_name' => 'Thompson',
                'email' => 'james.thompson@email.com',
                'phone' => '+1 (212) 555-0101',
                'is_vip' => true,
                'notes' => 'Prefers corner table. Allergic to shellfish.',
            ],
            [
                'first_name' => 'Sophia',
                'last_name' => 'Chen',
                'email' => 'sophia.chen@email.com',
                'phone' => '+1 (212) 555-0102',
                'is_vip' => true,
                'notes' => '_regular VIP guest. Celebrating anniversary.',
            ],
            [
                'first_name' => 'Michael',
                'last_name' => 'Rodriguez',
                'email' => 'michael.r@email.com',
                'phone' => '+1 (212) 555-0103',
                'is_vip' => false,
                'notes' => null,
            ],
            [
                'first_name' => 'Emily',
                'last_name' => 'Wang',
                'email' => 'emily.wang@email.com',
                'phone' => '+1 (212) 555-0104',
                'is_vip' => false,
                'notes' => 'Vegetarian preferences.',
            ],
            [
                'first_name' => 'David',
                'last_name' => 'Kim',
                'email' => 'david.kim@email.com',
                'phone' => '+1 (212) 555-0105',
                'is_vip' => true,
                'notes' => 'Business dinners frequently.',
            ],
            [
                'first_name' => 'Lisa',
                'last_name' => 'Anderson',
                'email' => 'lisa.anderson@email.com',
                'phone' => '+1 (212) 555-0106',
                'is_vip' => false,
                'notes' => null,
            ],
            [
                'first_name' => 'Robert',
                'last_name' => 'Foster',
                'email' => 'robert.foster@email.com',
                'phone' => '+1 (212) 555-0107',
                'is_vip' => false,
                'notes' => 'First time visitor.',
            ],
            [
                'first_name' => 'Jennifer',
                'last_name' => 'Nakamura',
                'email' => 'jennifer.n@email.com',
                'phone' => '+1 (212) 555-0108',
                'is_vip' => true,
                'notes' => 'Regular weekend guest.',
            ],
            [
                'first_name' => 'William',
                'last_name' => 'Harris',
                'email' => 'william.harris@email.com',
                'phone' => '+1 (212) 555-0109',
                'is_vip' => false,
                'notes' => null,
            ],
            [
                'first_name' => 'Amanda',
                'last_name' => 'Lee',
                'email' => 'amanda.lee@email.com',
                'phone' => '+1 (212) 555-0110',
                'is_vip' => false,
                'notes' => 'Food blogger - may post photos.',
            ],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}