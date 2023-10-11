"use strict";(self.webpackChunkproduct_feedback_app_code=self.webpackChunkproduct_feedback_app_code||[]).push([[550],{3550:(O,d,r)=>{r.r(d),r.d(d,{CreateFeedbackComponent:()=>T});var l=r(6895),n=r(433),g=r(6704),u=r(2743),f=r(5294),e=r(1571),b=r(9912);function C(o,v){1&o&&(e.TgZ(0,"span",19),e._uU(1," Can't be empty "),e.qZA())}function k(o,v){1&o&&(e.TgZ(0,"span",19),e._uU(1," Can't be empty "),e.qZA())}const h=function(o){return{"form__input--invalid":o}},Z=function(o){return{"form__textarea--invalid":o}};let T=(()=>{class o{constructor(p){this.store=p,this.categories=["Feature","UI","UX","Enhancement","Bug"],this.toggleDropdown=!1}ngOnInit(){this.form=new n.cw({title:new n.NI("",n.kI.required),category:new n.NI("Feature",n.kI.required),description:new n.NI("",n.kI.required)})}onGoBack(){this.store.dispatch(f.H())}onSubmit(){this.store.dispatch(u.L5({feedback:this.form.value}))}onCancel(){this.form.reset({title:"",category:"Feature",description:""})}static#e=this.\u0275fac=function(_){return new(_||o)(e.Y36(b.yh))};static#t=this.\u0275cmp=e.Xpm({type:o,selectors:[["app-create-feedback"]],standalone:!0,features:[e.jDz],decls:35,vars:13,consts:[[1,"section-new-feedback","bg-grey-light-3"],[1,"new-feedback"],["href","#",1,"go-back","new-feedback__back",3,"click"],["src","/assets/shared/icon-arrow-left.svg","alt",""],[1,"wrapper","bg-white"],["src","/assets/shared/icon-new-feedback.svg","alt","Create feeback icon",1,"new-feedback__icon"],[1,"heading-1","text-grey-dark-1"],[1,"form",3,"formGroup","ngSubmit"],[1,"form__group"],["for","title",1,"form__label"],[1,"form__input-description"],["type","text","name","title","id","title","formControlName","title",1,"form__input","form__input--text",3,"ngClass"],["class","form__error-msg",4,"ngIf"],["role","menu","id","title",3,"currOption","options","isOpen","openDropdown","changeSortOption"],["for","description",1,"form__label"],["name","description","id","description","formControlName","description",1,"form__textarea",3,"ngClass"],[1,"form__btn-group"],["type","button",1,"form__btn","form__btn--right","btn","btn--secondary",3,"click"],[1,"from__btn","form__btn--right","btn","btn--primary-1",3,"disabled"],[1,"form__error-msg"]],template:function(_,t){if(1&_&&(e.TgZ(0,"section",0)(1,"div",1)(2,"a",2),e.NdJ("click",function(){return t.onGoBack()}),e._UZ(3,"img",3),e._uU(4," Go Back "),e.qZA(),e.TgZ(5,"div",4),e._UZ(6,"img",5),e.TgZ(7,"h2",6),e._uU(8,"Create New Feedback"),e.qZA(),e.TgZ(9,"form",7),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(10,"div",8)(11,"label",9),e._uU(12,"Feedback Title"),e.qZA(),e.TgZ(13,"p",10),e._uU(14," Add a short, descriptive headline "),e.qZA(),e._UZ(15,"input",11),e.YNc(16,C,2,0,"span",12),e.qZA(),e.TgZ(17,"div",8)(18,"label",9),e._uU(19,"Category"),e.qZA(),e.TgZ(20,"p",10),e._uU(21," Choose a category for your feedback "),e.qZA(),e.TgZ(22,"app-category-dropdown",13),e.NdJ("openDropdown",function(){return t.toggleDropdown=!t.toggleDropdown})("changeSortOption",function(c){let i;return null==(i=t.form.get("category"))?null:i.setValue(c)}),e.qZA()(),e.TgZ(23,"div",8)(24,"label",14),e._uU(25,"Feedback Detail"),e.qZA(),e.TgZ(26,"p",10),e._uU(27," Include any specific comments on what should be improved, added, etc. "),e.qZA(),e._UZ(28,"textarea",15),e.YNc(29,k,2,0,"span",12),e.qZA(),e.TgZ(30,"div",16)(31,"button",17),e.NdJ("click",function(){return t.onCancel()}),e._uU(32," Cancel "),e.qZA(),e.TgZ(33,"button",18),e._uU(34," Add Feedback "),e.qZA()()()()()()),2&_){let a,c,i,s,m;e.xp6(9),e.Q6J("formGroup",t.form),e.xp6(6),e.Q6J("ngClass",e.VKq(9,h,null==(a=t.form.get("title"))?null:a.invalid)),e.xp6(1),e.Q6J("ngIf",null==(c=t.form.get("title"))?null:c.invalid),e.xp6(6),e.Q6J("currOption",null==(i=t.form.get("category"))?null:i.value)("options",t.categories)("isOpen",t.toggleDropdown),e.xp6(6),e.Q6J("ngClass",e.VKq(11,Z,null==(s=t.form.get("description"))?null:s.invalid)),e.xp6(1),e.Q6J("ngIf",null==(m=t.form.get("description"))?null:m.invalid),e.xp6(4),e.Q6J("disabled",t.form.invalid)}},dependencies:[l.ez,l.mk,l.O5,n.UX,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,g.v],styles:[".section-new-feedback[_ngcontent-%COMP%]{min-height:100vh;padding:9.2rem 0}.new-feedback[_ngcontent-%COMP%]{max-width:50rem;margin:0 auto}.new-feedback__back[_ngcontent-%COMP%]{margin-bottom:6.8rem}.new-feedback__icon[_ngcontent-%COMP%]{position:absolute;top:-5.2rem;transform:translateY(50%)}.new-feedback[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:4rem}.wrapper[_ngcontent-%COMP%]{padding:5.2rem 4.2rem 4rem;position:relative;border-radius:10px}"]})}return o})()}}]);