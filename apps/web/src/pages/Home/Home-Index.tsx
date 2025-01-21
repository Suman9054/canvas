
export default function HomeIndex() {
    return (
        <>
        
        
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-500 
                cursor-pointer transition-colors">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3">
                  <img 
                    src="/api/placeholder/200/200" 
                    alt="Project thumbnail" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium">Project {i + 1}</h3>
                <p className="text-sm text-gray-500">Modified 2d ago</p>
              </div>
            ))}
          
        </>
    )
}