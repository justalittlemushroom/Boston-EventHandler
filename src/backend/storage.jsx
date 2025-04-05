import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export async function addEvent(obj) {
    try {
        // Destructure the properties from the `obj` parameter
        const { name, url, address, image, date  } = obj;
        
        // Insert the event into the Supabase table "Events"
        const { data, error } = await supabase
        .from("Events") 
        .insert([{ name, url, image, address, date }]);  // Correctly pass the destructured properties
        
        // If there's an error, throw it
        if (error) throw error;
        
        // Show success message only if insertion is successful
        alert('Event Successfully Saved!');
    } catch (error) {
        // Alert the user if there's an error
        alert("Error Saving Event!")
        console.log(error.message);
    }
}

export async function deleteEvent(obj) {
    try {
        // Destructure the properties from the `obj` parameter
        const { name } = obj;
        
        const { data, error } = await supabase
        .from("Events") 
        .delete()
        .match({ name }); 
        
        // If there's an error, throw it
        if (error) throw error;
        
        // Show success message only if deletion is successful
        alert('Event Successfully Unsaved!');
    } catch (error) {
        // Alert the user if there's an error
        alert("Error Unsaving Event!")
        console.log(error.message);
    }
}

export async function getEventByName(name) {
    try {
        const { data, error } = await supabase 
        .from("Events")
        .select("*")
        .eq("name", name);
        if (error) throw error;
        if (data) { setEvents(data); }
    } catch (error) {
        alert(error);
    }
}

export async function getEventByTag(tag) {
    try {
        const { data, error } = await supabase 
        .from("Events")
        .select("*")
        .contains("tags", [tag]);
        if (error) throw error;
        if (data) { setEvents(data); }
    } catch (error) {
        alert(error);
    }
}

export async function getEvents(setEvents) {
    try {
        const { data, error } = await supabase 
        .from("Events")
        .select("*"); 
        if (error) throw error;
        if (data) { setEvents(data); }
    } catch (error) {
        alert(error);
    }
}