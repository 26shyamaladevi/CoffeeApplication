package com.example.CoffeeApp.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.CoffeeApp.repositories.ProductRepo;
import com.example.CoffeeApp.domains.Product;

@Service
public class ProductService {
    private final ProductRepo productrepo;

    public ProductService(ProductRepo productRepo) {
        this.productrepo = productRepo;
    }

    // Adds a new product to the repository
    public void addProduct(Product p, MultipartFile imageFile) throws IOException {
        int id = Math.abs(p.getproductName().hashCode());
        Product newProduct = new Product();

        newProduct.setid(id);
        newProduct.setproductName(p.getproductName());
        newProduct.setprice(p.getprice());
        newProduct.setDescription(p.getDescription());
        newProduct.setImageData(imageFile.getBytes());

        productrepo.save(newProduct);
    }

    // Retrieves a list of all products
    public List<Product> viewProducts() {
        return (List<Product>) productrepo.findAll();
    }

    // Updates an existing product in the repository
    public String updateProduct(Product product, MultipartFile imageFile) {
        try {
            // Optional: Validate product existence by ID
            Optional<Product> existingProductOptional = productrepo.findById(product.getid());
            if (existingProductOptional.isEmpty()) {
                return "Product with ID " + product.getid() + " not found.";
            }

            Product existingProduct = existingProductOptional.get();

            // Set updated attributes
            existingProduct.setproductName(product.getproductName());
            existingProduct.setprice(product.getprice());
            existingProduct.setDescription(product.getDescription());

            // Update image data if a new image is provided
            if (imageFile != null && !imageFile.isEmpty()) {
                existingProduct.setImageData(imageFile.getBytes());
            }

            // Save the updated product
            productrepo.save(existingProduct);

            return "Product " + existingProduct.getproductName() + " with ID " + existingProduct.getid()
                    + " is updated successfully.";
        } catch (IOException e) {
            // Handle IO exception
            return "Error updating product: " + e.getMessage();
        }
    }

    // Deletes a product from the repository based on its ID
    public boolean deleteProduct(Long id) {

        if (productrepo.existsById(id)) {
            productrepo.deleteById(id);

            return true;
        } else {
            return false;
        }
    }

    // Checks if a product with the given ID exists in the repository
    public boolean getid(long id) {
        return productrepo.existsById(id);
    }

    // Checks if a product with the given name already exists in the repository
    public boolean getpName(String pName) {
        List<Product> products = viewProducts();
        for (Product product : products) {
            if (product.getproductName().equals(pName)) {
                return false;
            }

        }

        return true;
    }

    public Product findById(Long id) {
        Optional<Product> optionalProduct = productrepo.findById(id);
        return optionalProduct.orElse(null);
    }

    public boolean existsById(long getid) {
        return productrepo.existsById(getid);
    }

}
