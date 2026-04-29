// Placeholder image URL for drivers without real images
const PLACEHOLDER_DRIVER_IMAGE = "https://via.placeholder.com/240x240?text=Driver";

export const drivers = [
  {
    id: "max_verstappen",
    name: "Verstappen",
    fullName: "Max Verstappen",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2Paeue_bCBsvNuLxxFJA1tbMVotRTY9VEZXgtHh3RdaOMlkFvZuESlRMxMhGQvg2fD5q9xQeTBXn3tWWZPxDpmYRxzhPAcDOrL1_AYf6c2LXEWVV5jl6-4gIsSIPtu1Qk5j5cH18IacBb9oJU1gcgrAYj8SPznTB4LqfJHs03EkWyMN6yaQHnUPTQ7P6dJ0qaxvsrq63OjDEnoThlXV57CTsdfiel8pTL_pjW4ICHf63S7-SNbS3Ncecgs3XfFLHXFCSG3JpETzM",
    alt: "High-end studio portrait of a racing athlete with sharp lighting and subtle shadows on dark background"
  },
  {
    id: "lewis_hamilton",
    name: "Hamilton",
    fullName: "Lewis Hamilton",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAccB4CFOshX8CXxnfS6piE-SYoa6Cn6JX97wH76znWIi58zTYixow-yxx_Wj3uFrZmkWNfr0OD7rzllGbn7Ii9RqxF2zKseC4ETChN-Qx8JGh3y9JEb4xpoFabEnjycY3a2a3BwFlnx9h55SXiO-pLbC5hBQ8fIZLWAaoT6AayG-eR1HmVSYkdt6j13bJo532ucsRVKQ4BkZBJVTi6McaltHH3eFS6z8z4lgoB5ry1tu2xHC0g64lxp61Tsd1SoywpVvWL47Y2raM",
    alt: "Monochrome cinematic portrait of a professional racing driver in high contrast studio lighting looking focused"
  },
  {
    id: "fernando_alonso",
    name: "Alonso",
    fullName: "Fernando Alonso",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeEkkbi8TjrRJ7igLDx61Uy_rPyDzrpD6LKFitOm6QgoiKzYLO3ygljZbQ8yiyj2AShaM7O0ZttHg-Kj5Q5srhI7Psm2CHUCHQ_Hxhd4nMdAoZ9HTeE8k51zUYQjkWM2772KJeyfDRzQBHtOhCXeabRIyT2-L0afMZ0YB1ZmAtxLCgbJSs5q6X3OsQi2w1Mt_jM5X3-9IPuacBPlCKNJc8MvcIVGCPEF4CRKZeWmC2FbGZQ0nwuCw0QVlN9728HCilBoyXtfM0HSk",
    alt: "Close-up of a focused race car driver in a helmet with dramatic mood lighting"
  },
  {
    id: "charles_leclerc",
    name: "Leclerc",
    fullName: "Charles Leclerc",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJrCL6c8Qc-0zhnLVRo4kSWBU53LLt_2IGLHUC2AaSMzkd4IhPBVTWtbjLD5xDzHtPxxyKA2XGfKY7gjrXc_Hfl46OEqo3-QZ2TyHR1kM8FeyxTEETrgW8M-9oxuhl1n_KrQJkKSo0QtcNIyhOOKvW_aZyydJbntGvC9ZEYdHZSUi_AVJNIro55ac1eF89s1A5DVNGSiVumz8bj9EzX5fRQbLLtEnl6K8_kluB-5qmjt1SHI69-j69AKpdLUz9cRefE_WMgIO7n8c",
    alt: "Artistic b&w studio shot of a modern athlete with subtle lens flare"
  },
  {
    id: "lando_norris",
    name: "Norris",
    fullName: "Lando Norris",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMiRmuaIDq2Bnj-yAmXmcS21Qd59M-od2y3yoztXLaGEwtxsv8dPsJIsEfFNLCS9wgWd1ApnksCCNSSYL111yx5UucJCmEV5QxseF7UH-juUHVQsI8z_ps33Q3E3ltV4YPljQvW6Kg6pdXl1s02kqGiVJ067tj9nsO8I4DCDEKMJzNZQQE-mtp9GxgTTUj2Mu5FvCEzN_OlEMbmYi98qveGyhZ_Mf5b9I24UvZq2ZXfJXtjxNcwIfpHougQ7gmwGXA_utGIghVXr8",
    alt: "Professional sports editorial portrait of a young man with moody atmosphere and dark clothing"
  },
  {
    id: "george_russell",
    name: "Russell",
    fullName: "George Russell",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4t6gg0xwHMnCCV55QtMlcV-AoeTbRsLB_v2F3fWNCANY2uF3Ovh2oEasIj8RaOp3sSFoZg_THyndHa59rf_TatE222acjg_iqD8Ykg9enfCZc0c3TZjITxCuvHS1IYW1OHTQ2cfjAiOtZ55jRtxzjcJxz8VBGr5eNxEZ3UHzbr_-Pbjh8yBSafSXTLXvBZ6KLal20TQMI7GQPyPs-8fx_Is4YpKcNeOtceZmtSet47WpDCVsAeP0P4SoI9Lfbc68Pl_LOYglMfVc",
    alt: "Soft focused studio portrait of an athlete in profile against a dark gray wall"
  },
  {
    id: "carlos_sainz",
    name: "Sainz",
    fullName: "Carlos Sainz",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJUa4NEeHzPS8gvZm5rVX0AI9nWq7w2Gn_VQMwgfP95LqtWKwXPjIG8rYyhvjgEmY_8Rn0fdc83T2ufrtfAdyQvNIuRE3HMTd4FflrrX2QsFktGld9FEdxmFdHBTrO60IPIPMX_P61KawUfWKcjfJkJgwV_AV4V44-kB85kLtIHPtr6cW4iv4Lykf8n9DE6_9bSbBjSNjyd1iOprL51lgQw9S-j6dWY7wFmdbEE8J19wdkeqkE2OMAeEFCLKMCgmrDLZa0gWlDltk",
    alt: "Cinematic close-up of a racing professional with intense lighting and deep shadows"
  },
  {
    id: "oscar_piastri",
    name: "Piastri",
    fullName: "Oscar Piastri",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkZt0LD5PrZzy5ERLutfUxpHw1nA3r6nEqJtews2y_0_XbYMCyK6db-AiD8HMPSyokVfPiR-BehQYbbPZ7gsdOc5EQ9MRJzvh0Ixr01emqRgoGLxDIwk6PXhDwz6U-MwkGQuNhOYoQp2o3DGpLYDcLKa4IGuV8rQg4L18YMViIh3G8-1yjK8yGSdN-Rkgd61nCLqujDz_pYuL1HyE49win2hg3dsMJHWCvXe_uGfcQpWgT59ZB9t4e2fpwSg6nQzLF3WOf_25bUMA",
    alt: "Modern athletic headshot with clean minimalist aesthetic and desaturated colors"
  },
  {
    id: "nico_hulkenberg",
    name: "Hulkenberg",
    fullName: "Nico Hulkenberg",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Professional portrait of an experienced racing driver in studio lighting"
  },
  {
    id: "yuki_tsunoda",
    name: "Tsunoda",
    fullName: "Yuki Tsunoda",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Focused athletic portrait with cool tones and professional lighting"
  },
  {
    id: "lance_stroll",
    name: "Stroll",
    fullName: "Lance Stroll",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Studio portrait of a professional racing athlete with dramatic lighting"
  },
  {
    id: "pierre_gasly",
    name: "Gasly",
    fullName: "Pierre Gasly",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Professional headshot with subtle background and warm lighting"
  },
  {
    id: "kevin_magnussen",
    name: "Magnussen",
    fullName: "Kevin Magnussen",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Experienced driver portrait in classic studio setup"
  },
  {
    id: "alex_albon",
    name: "Albon",
    fullName: "Alex Albon",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Professional athlete portrait with cool-toned background"
  },
  {
    id: "zhou_guanyu",
    name: "Zhou",
    fullName: "Zhou Guanyu",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Clean professional headshot with minimalist aesthetic"
  },
  {
    id: "esteban_ocon",
    name: "Ocon",
    fullName: "Esteban Ocon",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Professional racing driver portrait in bright studio"
  },
  {
    id: "oliver_bearman",
    name: "Bearman",
    fullName: "Oliver Bearman",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Young driver portrait with modern styling"
  },
  {
    id: "jack_doohan",
    name: "Doohan",
    fullName: "Jack Doohan",
    image: PLACEHOLDER_DRIVER_IMAGE,
    alt: "Professional athlete headshot with clean background"
  }
];

