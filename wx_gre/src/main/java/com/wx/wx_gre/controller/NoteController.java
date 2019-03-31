package com.wx.wx_gre.controller;

import com.wx.wx_gre.bean.Note;
import com.wx.wx_gre.service.NoteService;
import com.wx.wx_gre.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NoteController {

    @Autowired
    private NoteService noteService;
    @RequestMapping(value = "/notesList",method = RequestMethod.GET)
    public List queryNotesByUserId(Integer userid){
        List<Note> notesList = noteService.queryNotesByUserId(userid);
        return notesList;
    }

    @RequestMapping(value = "/findNote",method = RequestMethod.GET)
    @ResponseBody
    public Note findNotesByNoteId(Integer noteid){
        Note note = noteService.findNotesByNoteId(noteid);
        return note;
    }

    @RequestMapping(value = "/addNotes",method = RequestMethod.POST)
    @ResponseBody
    public int addNotes(Integer userid,String details) {
        Note note = new Note();
        note.setDetails(details);
        note.setUserid(userid);
        System.out.println(details);
        int result = noteService.addNotes(note);
        return result;
    }
    @RequestMapping(value = "/editNotes",method = RequestMethod.POST)
    public int editNotes(Note note) {
        int result = noteService.editNotes(note);
        return result;
    }

    @RequestMapping(value = "/deleteNotes",method = RequestMethod.GET)
    public int deleteNotes(Integer noteid) {
        int result = noteService.deleteNotes(noteid);
        return result;
    }
}
