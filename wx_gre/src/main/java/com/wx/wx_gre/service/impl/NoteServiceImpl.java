package com.wx.wx_gre.service.impl;

import com.wx.wx_gre.bean.Note;
import com.wx.wx_gre.dao.NoteDao;
import com.wx.wx_gre.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service(value = "noteService")
public class NoteServiceImpl implements NoteService {
    @Autowired
    private NoteDao noteDao;

    @Override
    public Note findNotesByNoteId(Integer noteid) {
        return noteDao.findNotesByNoteId(noteid);
    }

    @Override
    public List<Note> queryNotesByUserId(Integer userid) {
        return noteDao.queryNotesByUserId(userid);
    }

    @Override
    public int addNotes(Note note) {
        int result = 0;
        if (note.getUserid() != null) {
            note.setCreatetime(new Date());
            try {
                int effectedNum = noteDao.addNotes(note);
                if (effectedNum > 0) {
                    result = 1;
                } else {
                    System.out.println("插入便签失败");
                }
            } catch (Exception e) {
                System.out.println("插入便签异常" + e);
            }
        }
        return result;
    }

    @Override
    public int editNotes(Note note) {
        int result = 0;
        if (note.getUserid() != null && note.getNoteid() !=null) {
            note.setCreatetime(new Date());
            try {
                int effectedNum = noteDao.editNotes(note);
                if (effectedNum > 0) {
                    result = 1;
                } else {
                    System.out.println("修改便签失败");
                }
            } catch (Exception e) {
                System.out.println("修改便签异常" + e);
            }
        }
        return result;
    }

    @Override
    public int deleteNotes(Integer noteid) {
        int result = 0;
        if (noteid != null) {
            try {
                int effectedNum = noteDao.deleteNotes(noteid);
                if (effectedNum > 0) {
                    result = 1;
                } else {
                    System.out.println("删除便签失败");
                }
            } catch (Exception e) {
                System.out.println("删除便签异常" + e);
            }
        }
        return result;
    }
}
