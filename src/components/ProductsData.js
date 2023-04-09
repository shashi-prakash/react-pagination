import { useEffect, useState } from "react";

export default function ProductsData() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  console.table(products);
  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPage = (select) =>{
    if(select >= 1 && select <= products.length /10 && select !== pages)
    setPages(select)
  }
  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.slice(pages*10 -10, pages*10).map((prod) => {
            return (
              <>
                <span key={prod.id} className="products_single">
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                  <span> &nbsp;RS.{prod.price}</span>
                </span>
              </>
            );
          })}
        </div>
        
        )}
        {
            products.length > 0 &&
            <div className="pagination">
            <span className={pages > 1 ? "" : "pagination-disabled"} onClick={() => selectedPage(pages-1)}>Previous</span>
            {
                [...Array(products.length / 10)].map((_,i) =>{
                    return <span key={i.id} className={pages === i+1 ? "selected-page" :""} onClick={() => selectedPage(i+1)}>{i+1}</span>
                })
            }
            <span className={pages < products.length / 10 ? "" : "pagination-disabled"} onClick={() => selectedPage(pages+1)}>Next</span>
            </div>
            // :
            // <span className="no-data">No data available</span>
        }
    </>
  );
}
