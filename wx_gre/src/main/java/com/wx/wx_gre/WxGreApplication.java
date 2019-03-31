package com.wx.wx_gre;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan("/mapper")
@SpringBootApplication
public class WxGreApplication {

    public static void main(String[] args) {
        SpringApplication.run(WxGreApplication.class, args);
    }

}
