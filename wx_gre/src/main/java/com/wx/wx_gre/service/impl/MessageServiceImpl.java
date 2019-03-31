package com.wx.wx_gre.service.impl;

import com.wx.wx_gre.bean.Message;
import com.wx.wx_gre.dao.MessageDao;
import com.wx.wx_gre.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageDao messageDao;
    @Override
    public List<Message> queryMessagesByTypeId(Integer typeid) {
        return messageDao.queryMessagesByTypeId(typeid);
    }

    @Override
    public int addMessage(Message message) {
        int result = 0;
        if (message.getTypeid() != null) {
            message.setCreatetime(new Date());
            try {
                int effectedNum = messageDao.addMessage(message);
                if (effectedNum > 0) {
                    result = 1;
                } else {
                    System.out.println("插入留言失败");
                }
            } catch (Exception e) {
                System.out.println("插入留言异常" + e);
            }
        }
        return result;
    }
}
