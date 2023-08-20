from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import Mission, UserMission

import random

@login_required
def assign_missions(request):
    user = request.user

    #오늘 날짜
    today = timezone.now().date()

    # 오늘 날짜에 해당 사용자에게 할당된 미션이 있는지 확인
    if not UserMission.objects.filter(user=user, date=today).exists():

       # main 미션 할당
        main_missions = Mission.objects.filter(type='main')
        main_mission = random.choice(main_missions)
        UserMission.objects.create(user=user, mission=main_mission, date=today)

        # sub 미션 3개 할당
        sub_missions = Mission.objects.filter(type='sub')
        sub_missions = random.sample(list(sub_missions), 3)
        for sub_mission in sub_missions:
            UserMission.objects.create(user=user, mission=sub_mission, date=today)

    #return redirect('mission_list')

@login_required
def complete_mission(request, mission_id):
    user_mission = get_object_or_404(UserMission, id=mission_id)
    if user_mission.completed == True:
        user_mission.completed = False
    else:
        user_mission.completed = True
    user_mission.save()
    #return redirect('mission_list')

@login_required
def mission_list(request):
    user = request.user
    today = timezone.now().date()

    # 오늘 날짜에 해당 사용자에게 할당된 미션이 있는지 확인
    if not UserMission.objects.filter(user=user, date=today).exists():
        assign_missions(request)

    main_mission = UserMission.objects.filter(user=user, date=today, mission__type='main').first()
    sub_missions = UserMission.objects.filter(user=user, date=today, mission__type='sub')
    return render(request, 'mission_list.html', {'main_mission': main_mission, 'sub_missions': sub_missions})

@login_required
def change_mission(request, mission_id):
    user_mission = get_object_or_404(UserMission, id=mission_id)

    if user_mission.mission.type == 'main':
        missions = Mission.objects.filter(type='main').exclude(id=user_mission.mission.id)
        mission_changed = random.choice(missions)
    else:
        missions = Mission.objects.filter(type='sub').exclude(id=user_mission.mission.id)
        mission_changed = random.choice(missions)
    
    user_mission.mission = mission_changed
    user_mission.save()
    
    return redirect('mission_list')