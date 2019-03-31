package com.wx.wx_gre.controller;

import com.wx.wx_gre.bean.Message;
import com.wx.wx_gre.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.List;

@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;
    @RequestMapping(value = "/messageList",method = RequestMethod.GET)
    public List queryMessagesByTypeId(Integer typeid) {
        List<Message> messageList = messageService.queryMessagesByTypeId(typeid);
        return messageList;
    }

    @RequestMapping(value = "/addMessage",method = RequestMethod.POST)
    public int addMessage(Integer typeid,String nickname,String headimg,String text){
        Message message = new Message();
        message.setTypeid(typeid);
        message.setNickname(nickname);
        message.setHeadimg(headimg);
        message.setText(text);
        int result = 0;
        try {
            result = messageService.addMessage(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
