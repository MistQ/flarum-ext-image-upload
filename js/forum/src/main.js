import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import TextEditor from 'flarum/components/TextEditor';

import UploadButton from 'flagrow/image-upload/components/UploadButton';

app.initializers.add('flagrow-image-upload', app => {

    // add the `canUploadImages` attribute to the posts' prototype
    app.store.models.discussions.prototype.canUploadImages = Model.attribute('canUploadImages');

    /**
     * Add the upload button to the post composer.
     */
    extend(TextEditor.prototype, 'controlItems', function(items)
    {
        // get the current discussion object
        const discussion = app.current.discussion;
        // check whether the user can upload images. If not, returns.
        if (!discussion.canUploadImages()) return;

        // create and add the button
        var theButton = new UploadButton;
        theButton.textAreaObj = this;
        items.add('flagrow-image-upload', theButton, 0);

        // animate the button on hover: shows the label
        $(".Button-label", ".item-flagrow-image-upload > div").hide();
        $(".item-flagrow-image-upload > div").hover(
                function(){ $('.Button-label', this).show(); $(this).removeClass('Button--icon')},
                function(){ $('.Button-label', this).hide(); $(this).addClass('Button--icon')}
        );
    });
});
