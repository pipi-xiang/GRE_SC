import java.sql.Connection;
import java.sql.DriverManager;

public class connectionTest {
    public static void main(String[] args) {
        try {
            Connection conn= DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/wx_gre?verifyServerCertificate=false&useSSL=false&serverTimezone=UTC","root","123456");
            System.out.println("aaa");
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
