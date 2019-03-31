package com.wx.wx_gre.service;

import com.wx.wx_gre.bean.Message;

import java.text.ParseException;
import java.util.List;

public interface MessageService {
    //根据typeid查找全部便签
    List<Message> queryMessagesByTypeId(Integer typeid);
    //插入留言
    int addMessage(Message message) throws ParseException, Exception;
}
