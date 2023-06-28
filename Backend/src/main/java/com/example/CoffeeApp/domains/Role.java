package com.example.CoffeeApp.domains;

import java.util.List;
import jakarta.persistence.*;

/*Table representing the roles of users in the system
 * ADMIN - Administrator
 * USER - Regular User
 */

@Entity
public class Role {
    @Id
    @Column(length = 8)
    private long R_id;

    private String RName;

    @ManyToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<User> users;

    public long getR_id() {
        return R_id;
    }

    public void setR_id(long r_id) {
        R_id = r_id;
    }

    public String getRName() {
        return RName;
    }

    public void setRName(String user_role) {
        RName = user_role;
    }

}
