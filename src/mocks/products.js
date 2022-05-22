export const products = [
  {
    id: 1,
    title: 'Bộ vi xử lý',
    filter: {
      company: [
        {
          id: 1,
          name: 'AMD',
          count: 10,
        },
        {
          id: 2,
          name: 'Intel',
          count: 20,
        },
      ],
      CPU: [
        {
          id: 1,
          name: 'CPU Core i7',
          count: 10,
        },
        {
          id: 2,
          name: 'CPU Core i5',
          count: 10,
        },
      ],
    },
    products: [
      {
        pro_id: 'pro 1',
        part_id: 1,
        company_id: 1,
        cpu_id: 2,
        name: 'CPU AMD Ryzen 7 5800X3D (3.4 GHz with boost 4.5 GHz, 96MB cache, 8 cores, 16 threads, socket AM4, 105W)',
        price: 5000000,
        image: 'https://mega.com.vn/media/product/120_22191_cpu_amd_ryzen_7_5800x3d.jpg',
        guarantee: '36 tháng',
      },
      {
        pro_id: 'pro 2',
        part_id: 1,
        company_id: 1,
        cpu_id: 1,
        name: 'CPU AMD Ryzen 1 9000X3D (3.4 GHz with boost 4.5 GHz, 96MB cache, 8 cores, 16 threads, socket AM4, 105W)',
        price: 1000000,
        image: 'https://mega.com.vn/media/product/120_22191_cpu_amd_ryzen_7_5800x3d.jpg',
        guarantee: '36 tháng',
      },
      {
        pro_id: 'pro 3',
        company_id: 2,
        part_id: 1,
        cpu_id: 2,
        name: 'CPU AMD Ryzen 5 2900X3D (3.4 GHz with boost 4.5 GHz, 96MB cache, 8 cores, 16 threads, socket AM4, 105W)',
        price: 3050000,
        image: 'https://mega.com.vn/media/product/120_22191_cpu_amd_ryzen_7_5800x3d.jpg',
        guarantee: '36 tháng',
      },
      {
        pro_id: 'pro 4',
        company_id: 2,
        part_id: 1,
        cpu_id: 2,
        name: 'CPU AMD Ryzen 5 2900X3D (3.4 GHz with boost 4.5 GHz, 96MB cache, 8 cores, 16 threads, socket AM4, 105W)',
        price: 3050000,
        image: 'https://mega.com.vn/media/product/120_22191_cpu_amd_ryzen_7_5800x3d.jpg',
        guarantee: '36 tháng',
      },
    ],
  },
  {
    id: 2,
    title: 'Bo mạch chủ',
    filter: {
      company: [
        {
          id: 1,
          name: 'AMD',
          count: 10,
        },
        {
          id: 2,
          name: 'Intel',
          count: 20,
        },
      ],
      CPU: [
        {
          id: 1,
          name: 'CPU Core i7',
          count: 10,
        },
        {
          id: 2,
          name: 'CPU Core i5',
          count: 10,
        },
      ],
    },
    products: [
      {
        pro_id: 'pro 1',
        part_id: 2,
        name: 'CPU AMD Ryzen 7 5800X3D (3.4 GHz with boost 4.5 GHz, 96MB cache, 8 cores, 16 threads, socket AM4, 105W)',
        price: 1000000,
        image:
          'https://mega.com.vn/media/product/120_22220_mainboard_msi_mag_b550m_mortar.jpg',
        guarantee: '36 tháng',
      },
      {
        pro_id: 'pro 2',
        part_id: 2,
        name: 'CPU AMD Ryzen 1 9000X3D (3.4 GHz with boost 4.5 GHz, 96MB cache, 8 cores, 16 threads, socket AM4, 105W)',
        price: 1000000,
        image:
          'https://mega.com.vn/media/product/120_22113_mainboard_msi_mag_b660_tomahawk_wifi_ddr4.jpg',
        guarantee: '36 tháng',
      },
      {
        pro_id: 'pro 3',
        part_id: 2,
        name: 'CPU AMD Ryzen 5 2900X3D (3.4 GHz with boost 4.5 GHz, 96MB cache, 8 cores, 16 threads, socket AM4, 105W)',
        price: 1000000,
        image: 'https://mega.com.vn/media/product/120_22191_cpu_amd_ryzen_7_5800x3d.jpg',
        guarantee: '36 tháng',
      },
    ],
  },
];
