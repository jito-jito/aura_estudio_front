interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoriesProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

export function Categories({ categories, onCategoryClick }: CategoriesProps) {
  return (
    <section className="py-24 bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
            Explora por Categoría
          </h2>
          <p className="text-lg text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Encuentra el estilo perfecto para tu espacio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="group text-center transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-square rounded-full overflow-hidden mb-6 shadow-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                {category.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
