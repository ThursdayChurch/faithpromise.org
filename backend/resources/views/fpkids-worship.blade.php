@extends('layouts.page', ['title' => 'KidRAVE', 'hero_image' => 'images/pages/fpkids-worship-wide.jpg'])

@section('page')

    @introsection(['title' => 'Kids Leading Kids to Worship'])
    <p>fpKids Worship is designed for kids, students, and young adults who like to move for God. fpKids Worship is vital to our belief that kids make great worshipers. fpKids Worship provides kids the opportunity to lead worship during the fpKids weekend services and special events during the year. Run-throughs are used to focus in on the best use of the skills and talents that God has given you. (Run-through times are specific to each campus) fpKids Worship team members are to wear their fpKids Worship t-shirt each week.</p>
    <p>Please use the following links to register for your campus:
        <a class="no-wrap" href="https://fpctystn.infellowship.com/Forms/322134">Pellissippi</a>,
        <a class="no-wrap" href="https://fpctystn.infellowship.com/Forms/326014">Blount</a>,
        <a class="no-wrap" href="https://fpctystn.infellowship.com/Forms/326103">North Knox</a>,
        <a class="no-wrap" href="https://fpctystn.infellowship.com/Forms/326104">Anderson</a>,
        <a class="no-wrap" href="https://fpctystn.infellowship.com/Forms/326105">Campbell</a>.</p>
    @endintrosection

    @textsection([
    'class' => 'Section--lightGrey',
    'title' => 'Practice',
        'buttons' => [
            [
                'title' => 'Practice Videos',
                'url' => 'https://vimeo.com/album/3863224'
            ]
        ]])
    <p>Hey Parents! We are so proud of our fpWorship leaders. In efforts to make practice even easier for them (and you!) we are starting a new approach to practicing. Starting August 1st, physical copies of DVDs will only be made upon request. Instead a digital version will be offered. All you need to do is click the &quot;Practice Videos&quot; button below and enter the password: &quot;Kidrave16&quot; and that’s it! You will be taken to a playlist that contains all lyric videos and motions for your child to practice. It is important to note that registration for KidRave for the 2016-2017 school year will be available in July. On August 1st, the password for the digital practice videos will be reset to a new password that will be emailed to you once you register your child as a 2016-2017 KidRave participant. We are so excited for what we have planned for this upcoming year and we hope that you will be too! If you have any questions or need to request a physical copy, please contact your campus fpKids Director.</p>
    @endtextsection

@endsection